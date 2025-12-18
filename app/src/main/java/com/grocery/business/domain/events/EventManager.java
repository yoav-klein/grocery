package com.grocery.business.domain.events;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class EventManager {
    private final EventBuffer eventBuffer = new EventBuffer();
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final ReadWriteLock lock = new ReentrantReadWriteLock();
    private final AtomicInteger eventIdCounter = new AtomicInteger(0);

    public SseEmitter registerEmitter(int lastEventId) throws Exception {
        // while registering, we don't want any events published until the 
        // new emitter is in the list
        lock.writeLock().lock();
        
        try {
            SseEmitter emitter = new SseEmitter();
            // this is important, as if we won't send this and there will be no message sent within the timeout,
            // the HTTP reseponse will be 503, and the client won't re-connect
            emitter.send(SseEmitter.event().comment("Welcome"));

            /* TODO: handle edge case where events missed between main page load and the request to the regsitration */
            if(lastEventId != -1) {
                List<Event<?>> missed = eventBuffer.getFromLastEventId(lastEventId);
                try {
                    for(Event<?> missedEvent : missed) {
                        emitter.send(SseEmitter.event().id(String.valueOf(missedEvent.getId())).name(missedEvent.getStreamName()).data(missedEvent.getData()));
                    }
                } catch(IOException e) { 
                    System.out.println("Failed to sent missed events" + e);
                    throw e;
                }
            }

            emitters.add(emitter);
            emitter.onCompletion(() -> { emitters.remove(emitter); System.out.println("COMPLETED CALLBACK"); } );
            emitter.onTimeout   (() -> { emitters.remove(emitter); System.out.println("TIMEOUT CALLBACK"); });
            emitter.onError     ((e) ->  {  emitters.remove(emitter); System.out.println("ERROR CALLBACK: " + e); });

            return emitter;
        } catch(Exception e) {
            throw e;
        } finally {
            lock.writeLock().unlock();
        }

    }

    public void addEvent(Event<?> event) {
        // set the event ID
        int eventId = eventIdCounter.incrementAndGet();
        event.setId(eventId);

        // if there is currently a registering emitter, wait for him
        lock.readLock().lock();
        try {
            // put the event in the buffer
            eventBuffer.put(event);
            
            // publish to all emitters
            List<SseEmitter> deadEmitters = new ArrayList<>();
            emitters.forEach(emitter -> {
                try {
                    emitter.send(SseEmitter.event().id(String.valueOf(event.getId())).name(event.getStreamName()).data(event.getData()));
                } catch(IOException e) {
                    deadEmitters.add(emitter);
                }
            });
            emitters.removeAll(deadEmitters);
        } finally {
            lock.readLock().unlock();
        }
    }

    private class EventBuffer {
        private final Map<Integer, Event<?>> eventMap;
        private final AtomicInteger lastId = new AtomicInteger(0);

        public EventBuffer() {
            this.eventMap = new ConcurrentHashMap<>();
        }

        public void put(Event<?> event) {
            // first, put the event in the map
            int eventId = event.getId();
            eventMap.put(eventId, event);
            
            // compare and set for thread safety. multiple threads can execute this method concurrently
            int last;
            do {
                // if this event is already not the lastest, skip
                last = lastId.get();
                if(last > eventId) break;
            } while(!lastId.compareAndSet(last, event.getId()));
            
        }

        public List<Event<?>> getFromLastEventId(int lastReceived) {
            List<Event<?>> missedEvents = new ArrayList<>();

            for(int i = lastReceived + 1; i <= lastId.get(); ++i) {
                missedEvents.add(this.eventMap.get(i));
            }

            return missedEvents;
        }
    }
}