package com.grocery;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTransactionalTestNGSpringContextTests;
import org.testng.annotations.Test;

import com.grocery.business.SpringInfraConfig;
import com.grocery.business.domain.dto.ProductRequest;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;
import com.grocery.business.domain.repository.ProductDAO;
import com.grocery.business.domain.repository.SpringDomainRepositoryConfig;


@ContextConfiguration(classes = { SpringDomainRepositoryConfig.class, SpringInfraConfig.class })
public class RepositoryTest  extends AbstractTransactionalTestNGSpringContextTests {
    
    @Autowired
    private ProductDAO productDao;

    @Test
    public void testAddProduct() throws Exception {
        
        ProductRequest pr = new ProductRequest();
        pr.setName("Kaki");
        pr.setCategory(ProductCategory.ALCOHOL);
        pr.setQuantityType(QuantityType.KG);
        
        productDao.addProduct("d271397f084242e1b4b7d0d840cbadf7", pr);

    }

    @Test
    public void testAddProducts() throws Exception {
        productDao.initProducts("d271397f084242e1b4b7d0d840cbadf7");
    }
}
