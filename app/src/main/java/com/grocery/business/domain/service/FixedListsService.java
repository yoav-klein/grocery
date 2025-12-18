package com.grocery.business.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.grocery.business.domain.repository.ListProductDAO;
import com.grocery.business.domain.repository.FixedListsDAO;
import com.grocery.business.domain.model.FixedList;
import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.exception.FixedListNotFoundException;
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
    public void createFixedList(String tenantId, String name, List<Integer> productIds) {
        int listId = this.fixedListDao.addFixedList(tenantId, name);
        listProductDao.batchAddProductsToList(tenantId, listId, productIds);
    }

    public List<Product> getAllProductsForList(String tenantId, int listId) { 
        return listProductDao.getAllProductsForList(tenantId, listId);
    }


    public void addProductToList(String tenantId, int listId, Product product) {
        listProductDao.addProductToList(tenantId, listId, product.getProductId());
    }

}
