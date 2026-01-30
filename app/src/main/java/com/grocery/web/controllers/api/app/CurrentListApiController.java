
package com.grocery.web.controllers.api.app;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.grocery.business.domain.dto.ListItemRequest;
import com.grocery.business.domain.dto.ProductQuantity;
import com.grocery.business.domain.events.AddItemEvent;
import com.grocery.business.domain.events.DeleteItemEvent;
import com.grocery.business.domain.events.EventManager;
import com.grocery.business.domain.events.ListRefreshEvent;
import com.grocery.business.domain.model.AddItemResult;
import com.grocery.business.domain.service.CurrentListService;
import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.domain.exception.ProductNotFoundException;

@Controller
@RequestMapping("/tenant/{tenantId}/currentList")
public class CurrentListApiController {

    private final EventManager eventManager = new EventManager();

    @Autowired
    private CurrentListService currentListService;

    // add item
    @PostMapping("/addItem")
    public ResponseEntity addItem(@RequestBody @Validated ListItemRequest request, @AuthenticationPrincipal Object user, @PathVariable("tenantId") String tenantId) throws UserNotFoundException {
        OAuth2User oauth2User = (OAuth2User)user;
        AddItemResult result = currentListService.addListItem(request, oauth2User.getAttribute("sub"), tenantId);

        if     (result.getResult() == AddItemResult.Result.CREATED) eventManager.addEvent(new AddItemEvent(result.getItem()));
        else if(result.getResult() == AddItemResult.Result.UPDATED) System.out.println("IMPLEMENT UPDATE EVENT");

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // bulk add
    @PostMapping("/bulk/{listId}")
    public ResponseEntity batchAdd(@PathVariable("tenantId") String tenantId, 
            @AuthenticationPrincipal Object user, 
            @PathVariable("listId") String listId, 
            @RequestBody @Validated ArrayList<ProductQuantity> productQuantityList) throws UserNotFoundException, ProductNotFoundException {
        OAuth2User oauth2User = (OAuth2User)user;

        currentListService.bulkAdd(tenantId, oauth2User.getAttribute("sub"), listId, productQuantityList);

        eventManager.addEvent(new ListRefreshEvent());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
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

    @ExceptionHandler
    public final ProblemDetail handleProductNotFoundException(ProductNotFoundException ex, WebRequest request) throws Exception {
        ProblemDetail pd = ProblemDetail.forStatus(404);
        pd.setType(URI.create("product-not-found"));
        pd.setTitle("Product not found"); // TODO: localize message
        
        return pd;
    }
}