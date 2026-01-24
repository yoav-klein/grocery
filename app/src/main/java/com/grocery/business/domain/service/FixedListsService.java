package com.grocery.business.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.business.domain.exception.FixedListAlreadyExistsException;
import com.grocery.business.domain.exception.FixedListNotFoundException;
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

    public List<FixedList> getAllFixedLists(String tenantId) {
        return fixedListDao.getAllFixedLists(tenantId);
    }

    public FixedList getFixedList(String tenantId, int listId) throws FixedListNotFoundException {
        FixedList list = fixedListDao.getFixedList(tenantId, listId);
        list.setProducts(listProductDao.getAllProductsForList(tenantId, listId));

        return list;
    }
    
    // TRANSACTIONAL
    public int createFixedList(String tenantId, String name, List<Integer> productIds) throws FixedListAlreadyExistsException {
        int listId = this.fixedListDao.addFixedList(tenantId, name);
        listProductDao.batchAddProductsToList(tenantId, listId, productIds);

        return listId;
    }

    public void editFixedList(String tenantId, int listId, String listName, List<Integer> addProducts, List<Integer> removeProducts) throws FixedListNotFoundException {
        this.fixedListDao.updateListName(tenantId, listId, listName);
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
