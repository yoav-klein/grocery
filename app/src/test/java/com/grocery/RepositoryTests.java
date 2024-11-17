package com.grocery;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.context.WebApplicationContext;


import org.testng.annotations.*;

import com.grocery.business.SpringBusinessConfig;
import com.grocery.web.SpringWebConfig;
import com.grocery.business.entities.repositories.ProductDAO;
import com.grocery.business.entities.ProductCategory;
import com.grocery.business.entities.QuantityType;
import com.grocery.business.entities.Product;

import static org.assertj.core.api.Assertions.assertThat;


@WebAppConfiguration
@ActiveProfiles("dev")
@ContextConfiguration(classes = { SpringWebConfig.class, SpringBusinessConfig.class })
public class RepositoryTests extends AbstractTestNGSpringContextTests {
    @Autowired
    WebApplicationContext wac;

    @Autowired
    ProductDAO productDao;
    
    @Test
    void productTest() throws Exception {
        List<Product> products = productDao.getAllProducts();

        assertThat(products.size()).isEqualTo(0);
        productDao.addProduct(new Product("Coca Cola", ProductCategory.BEVERAGES, QuantityType.UNIT));

        products = productDao.getAllProducts();
        assertThat(products.size()).isEqualTo(1);
        assertThat(products).anyMatch(product -> "Coca Cola".equals(product.getName()));
        
        Product cola = products.get(0);
        int id = cola.getProductId();

        productDao.deleteProduct(id);
        products = productDao.getAllProducts();
        assertThat(products.size()).isEqualTo(0);
        
        
    }
}
