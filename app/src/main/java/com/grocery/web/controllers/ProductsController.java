package com.grocery.web.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.grocery.business.entities.ProductCategory;
import com.grocery.business.entities.QuantityType;
import com.grocery.business.entities.Product;
import com.grocery.business.services.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class ProductsController {
    
    @Autowired
    private ProductService productService;

    @ModelAttribute("allQuantityTypes")
    public QuantityType[] populateAllTypes() {
        return QuantityType.values();
    }

    @ModelAttribute("product")
    public Product populateProduct() {
        return new Product();
    }

    @ModelAttribute("allCategories")
    public ProductCategory[] populateAllCategories() {
        return ProductCategory.values();
    }

    @ModelAttribute("productsByCategory")
    public Map<ProductCategory, List<Product>> allProducts() {
        return productService.getProductsByCategory();
    }
    
    @GetMapping("/myProducts")
    public String myProducts(Model model) {
        return "html/my-products";
    }

    @PostMapping("/newProduct")
    public String myProducts(@Validated @ModelAttribute Product product, BindingResult result) {
        if(result.hasErrors()) {
            return "html/my-products";
        }
        productService.addProduct(product);

        return "redirect:/myProducts";
    }

    @GetMapping("/deleteProduct")
    public String deleteItem(@RequestParam("id") int id) {
        this.productService.deleteProduct(id);
        return "redirect:/myProducts";
    }

}
