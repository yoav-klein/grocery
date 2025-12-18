package com.grocery.business.domain.events;

abstract public class Event<T> {
    
    protected int id;
    protected T data;
    /* private String streamName; */

    public Event() {}
    /* public Event(int id, T data, String streamName) {
        this.id = id;
        this.data = data;
        // this.streamName = streamName;
    }
 */
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    abstract public String getStreamName();
/* 
    public String getStreamName() {
        return streamName;
    }

    public void setStreamName(String streamName) {
        this.streamName = streamName;
    }
 */
    
}