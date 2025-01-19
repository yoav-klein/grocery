package com.grocery.web.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.grocery.business.entities.Product;
import com.grocery.business.services.ListItemService;
import com.grocery.business.services.ProductService;

import com.grocery.web.dto.CategoryProduct;
import com.grocery.web.dto.CategoryProductDto;
import com.grocery.web.dto.ProductQuantity;
import com.grocery.web.dto.ProductQuantityDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ListController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ListItemService itemService;

    @ModelAttribute("categoryProductDto")
    public CategoryProductDto categoryProductDto() {
        List<Product> allProducts = productService.getAllProducts();

        CategoryProductDto categoryProductDto = new CategoryProductDto();
        List<CategoryProduct> categoryProductList = categoryProductDto.getCategoryProducts();

        allProducts.stream()
            .collect(Collectors.groupingBy(Product::getCategory))
                .forEach((k, v) -> { categoryProductList.add(new CategoryProduct(k, v)); });
        
        return categoryProductDto;
    }

    @ModelAttribute("productQuantityDto")
    public ProductQuantityDto productQuantityDto() {
        ProductQuantityDto productQuantityDto = new ProductQuantityDto();
        return productQuantityDto;
    }
    
    
    @GetMapping("/myList")
    public String fixedList(Model model) {
        return "html/my-list";
    }

    @PostMapping("/insert")
    public String insert(@ModelAttribute ProductQuantityDto dto) {
        List<List<ProductQuantity>> list = dto.getProductQuantities();
        List<ProductQuantity> summed = new ArrayList<>();
        for(List<ProductQuantity> sublist : list) {
            sublist.stream().filter(t -> t.getQuantity() > 0).forEach(t -> summed.add(t));
        }

        for(ProductQuantity pq : summed) {
            itemService.addByProductId(pq.getProductId(), pq.getQuantity());
        }
        
        return "redirect:/";
    }

}
