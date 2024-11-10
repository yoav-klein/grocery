
package com.grocery;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.http.MediaType;

import org.springframework.test.context.web.*;
import org.springframework.test.context.*;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

import org.testng.annotations.*;

import com.grocery.web.SpringWebConfig;
import com.grocery.business.SpringBusinessConfig;
import com.grocery.business.entities.ListItem;
import com.grocery.business.entities.ProductCategory;

import static org.assertj.core.api.Assertions.assertThat;

@WebAppConfiguration
@ActiveProfiles("dev")
@ContextConfiguration(classes = { SpringWebConfig.class, SpringBusinessConfig.class })
public class AppTest extends AbstractTestNGSpringContextTests {
    private MockMvc mockMvc;

    @Autowired
    WebApplicationContext wac;

    @BeforeMethod
    void setup() {
        this.mockMvc = webAppContextSetup(this.wac).build();
    }

    @Test
    void testMainPage() throws Exception {
        mockMvc.perform(get("/")).andExpect(status().isOk())
        .andExpect(model().attributeExists("itemsByCategory"));
    }
    
    @Test
    void testAddFruit() throws Exception {
        
        mockMvc.perform(post("/newItem")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .param("name", "Cucumber")
            .param("quantity", "2")
            .param("quantityType", "KG")
            .param("category", "VEGETABLES"))
            .andExpect(model().hasNoErrors());
        
        MvcResult result = mockMvc.perform(get("/")).andReturn();
        Map<ProductCategory, List<ListItem>> itemsByCategory = (Map<ProductCategory, List<ListItem>>)result.getModelAndView().getModelMap().getAttribute("itemsByCategory");
        assertThat(itemsByCategory).containsKey(ProductCategory.VEGETABLES);

        List<ListItem> items = itemsByCategory.get(ProductCategory.VEGETABLES);
        assertThat(items).anyMatch(item -> "Cucumber".equals(item.getName()));
        
        assertThat(items).hasSize(1);

    }

    @Test
    void testZeroItems() throws Exception {
        mockMvc.perform(post("/newItem")
            .contentType(MediaType.APPLICATION_FORM_URLENCODED)
            .param("name", "Cucumber")
            .param("quantity", "0")
            .param("quantityType", "KG")
            .param("category", "VEGETABLES"))
            .andExpect(model().hasErrors());
    }

    @Test
    void addProductTest() throws Exception {
        
    }
}