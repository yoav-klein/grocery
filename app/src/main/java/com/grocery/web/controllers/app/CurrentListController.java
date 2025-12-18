
package com.grocery.web.controllers.app;

import java.io.IOException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.grocery.business.domain.dto.ListItemRequest;
import com.grocery.business.domain.dto.ProductQuantity;
import com.grocery.business.domain.events.AddItemEvent;
import com.grocery.business.domain.events.DeleteItemEvent;
import com.grocery.business.domain.events.EventManager;
import com.grocery.business.domain.model.CurrentListItem;
import com.grocery.business.domain.service.CurrentListService;
import com.grocery.business.tenancy.exception.UserNotFoundException;

@Controller
@RequestMapping("/tenant/{tenantId}/currentList")
public class CurrentListController {

    private final EventManager eventManager = new EventManager();

    @Autowired
    private CurrentListService currentListService;

    @GetMapping
    public String currentList(Model model, @PathVariable("tenantId") String tenantId) {
        // add to model current list of tenant
        model.addAttribute("page", "currlist");
        model.addAttribute("itemsByCategory", currentListService.getCurrentListByCategory(tenantId));
        
        return "current-list";
    }

    // add item
    @PostMapping("/addItem")
    public ResponseEntity addItem(@RequestBody ListItemRequest request, @AuthenticationPrincipal Object user, @PathVariable("tenantId") String tenantId) throws UserNotFoundException {
        OAuth2User oauth2User = (OAuth2User)user;
        CurrentListItem item = currentListService.addListItem(request, oauth2User.getAttribute("sub"), tenantId);

        eventManager.addEvent(new AddItemEvent(item));

        return new ResponseEntity(HttpStatus.OK);
    }

    // bulk add
    @PostMapping("/bulk/{listId}")
    public ResponseEntity batchAdd(@PathVariable("tenantId") String tenantId, 
            @AuthenticationPrincipal Object user, 
            @PathVariable("listId") String listId, 
            @RequestBody ArrayList<ProductQuantity> productQuantityList) throws UserNotFoundException {
        OAuth2User oauth2User = (OAuth2User)user;
        currentListService.bulkAdd(tenantId, oauth2User.getAttribute("sub"), listId, productQuantityList);

        return new ResponseEntity(HttpStatus.OK);
    }

    // lastEventId is either sent by the EventSource object in a reconnect in the header, or in the first connection as a parameter (code the javascript)
    @GetMapping(path="/itemStream", produces=MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter itemStreamSseEmitter(@RequestHeader(value="Last-Event-ID", required=false) String lastEventIdHeader) throws IOException {
        int lastEventId;
        String lastEventIdStr = lastEventIdHeader == null ? null : lastEventIdHeader;
        if(lastEventIdStr == null || lastEventIdStr.equals("")) {
            lastEventId = -1;
        } else {
            lastEventId = Integer.parseInt(lastEventIdStr);
        }
        
        SseEmitter emitter;
        try {
            emitter = eventManager.registerEmitter(lastEventId);
        } catch(Exception e) {
            System.out.println("Failed to register emitter: " + e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        return emitter;
    }

    @DeleteMapping("/item")
    public ResponseEntity deleteItem(@RequestParam("itemId") String itemId, @AuthenticationPrincipal Object user, @PathVariable("tenantId") String tenantId) throws UserNotFoundException {
        OAuth2User oauth2User = (OAuth2User)user;

        currentListService.deleteListItem(tenantId, oauth2User.getAttribute("sub"), itemId);

        eventManager.addEvent(new DeleteItemEvent(itemId));

        return new ResponseEntity(HttpStatus.OK);
    }

}