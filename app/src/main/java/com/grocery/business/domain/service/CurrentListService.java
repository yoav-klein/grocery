package com.grocery.business.domain.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.business.domain.dto.ListItemRequest;
import com.grocery.business.domain.dto.ProductQuantity;
import com.grocery.business.domain.model.CurrentListItem;
import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.repository.CurrentListDao;
import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.model.User;
import com.grocery.business.tenancy.service.UserService;

@Service
public class CurrentListService {
    
    @Autowired
    private CurrentListDao listItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    public List<CurrentListItem> getAllItems(String tenantId) {
        return listItemRepository.getAllListItems(tenantId);
    }

    public Map<ProductCategory, List<CurrentListItem>> getCurrentListByCategory(String tenantId) {
        return this.getAllItems(tenantId).stream().collect(Collectors.groupingBy(CurrentListItem::getCategory));
    }

    public CurrentListItem addListItem(ListItemRequest request, String userId, String tenantId) throws UserNotFoundException {
        CurrentListItem item = new CurrentListItem();
        item.setName(request.getName());
        item.setQuantity(request.getQuantity());
        item.setAddedBy(userService.getUserById(userId));
        item.setAddedAt(LocalDateTime.now());
        item.setQuantityType(request.getQuantityType());
        item.setCategory(request.getCategory());

        int id = listItemRepository.saveItem(tenantId, userId, item);
        item.setId(id);

        return item;
    }

    public void bulkAdd(String tenantId, String userId, String listId, List<ProductQuantity> products) throws UserNotFoundException {
        System.out.println("BULK ADD SERVICE");
        System.out.println(products.size());
        List<CurrentListItem> itemsToAdd = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        User addedBy = userService.getUserById(userId);
        
        products.forEach(productQuantity -> {
            Product product = productService.getProductById(tenantId, productQuantity.getId());
            CurrentListItem item = new CurrentListItem();
            item.setName(product.getName());
            item.setQuantity(productQuantity.getQuantity());
            item.setAddedBy(addedBy);
            item.setAddedAt(now);
            item.setQuantityType(product.getQuantityType());
            item.setCategory(product.getCategory());

            System.out.println("BULK ADDING: " + item.getQuantity() + " X " + item.getName() );

            itemsToAdd.add(item);
        });

        listItemRepository.bulkSave(tenantId, itemsToAdd);
    }

    public void deleteListItem(String tenantId, String userId, String itemId) {
        // TODO: consider using userId
        listItemRepository.deleteItem(tenantId, itemId);
    }
}
