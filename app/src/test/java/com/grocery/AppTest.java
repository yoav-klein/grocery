
package com.grocery;

import org.springframework.test.context.web.*;
import org.springframework.test.context.*;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.ui.ModelMap;

import org.testng.annotations.*;
import static org.testng.Assert.*;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;

import com.grocery.web.SpringWebConfig;
import com.grocery.business.SpringBusinessConfig;
import com.grocery.business.entities.Item;
import com.grocery.business.entities.ItemCategory;

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
        Map<ItemCategory, List<Item>> itemsByCategory = (Map<ItemCategory, List<Item>>)result.getModelAndView().getModelMap().getAttribute("itemsByCategory");
        assertThat(itemsByCategory).containsKey(ItemCategory.VEGETABLES);

        List<Item> items = itemsByCategory.get(ItemCategory.VEGETABLES);
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
}