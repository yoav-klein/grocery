package com.grocery.business.domain.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.grocery.business.domain.exception.FixedListAlreadyExistsException;
import com.grocery.business.domain.exception.FixedListNotFoundException;
import com.grocery.business.domain.exception.ProductNotFoundException;
import com.grocery.business.domain.model.FixedList;
import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.repository.FixedListsDAO;
import com.grocery.business.domain.repository.ListProductDAO;
@Service
public class FixedListsService {
    
    @Autowired
    ListProductDAO listProductDao;

    @Autowired
    FixedListsDAO fixedListDao;

    @Autowired
    ProductService productService;

    public List<FixedList> getAllFixedLists(String tenantId) {
        return fixedListDao.getAllFixedLists(tenantId);
    }

    public FixedList getFixedList(String tenantId, int listId) throws FixedListNotFoundException {
        FixedList list = fixedListDao.findFixedList(tenantId, listId).orElseThrow(() -> { return new FixedListNotFoundException(listId); });
        list.setProducts(listProductDao.getAllProductsForList(tenantId, listId));

        return list;
    }
    
    @Transactional
    public int addFixedList(String tenantId, String name, List<Integer> productIds) throws FixedListAlreadyExistsException, ProductNotFoundException {
        int listId = this.fixedListDao.insertFixedList(tenantId, name);

        // check that all product ids are actually there to handle a situation where someone deleted some in the meantime
        List<Product> allProducts = this.productService.getAllProducts(tenantId);
        List<Integer> allProductIds = allProducts.stream().map(Product::getProductId).collect(Collectors.toList());
        
        System.out.println("CHECKING");
        for(int i = 0; i < productIds.size(); ++i) {
            System.out.println(productIds.get(i)); 
            if(!allProductIds.contains(productIds.get(i))) {
                System.out.println("FOUND!!");
                throw new ProductNotFoundException(productIds.get(i));
            }
        }

        listProductDao.batchAddProductsToList(tenantId, listId, productIds);

        return listId;
    }

    public void editFixedList(String tenantId, int listId, String listName, List<Integer> addProducts, List<Integer> removeProducts) throws FixedListNotFoundException {
        this.fixedListDao.updateListName(tenantId, listId, listName);
        System.out.println("Updated list name!");
        this.listProductDao.editProducts(tenantId, listId, addProducts, removeProducts);
    }

    public void deleteFixedList(String tenantId, int listId) {
        fixedListDao.deleteFixedList(tenantId, listId);
    }

    public List<Product> getAllProductsForList(String tenantId, int listId) { 
        return listProductDao.getAllProductsForList(tenantId, listId);
    }


    public void addProductToList(String tenantId, int listId, Product product) {
        listProductDao.addProductToList(tenantId, listId, product.getProductId());
    }

}
