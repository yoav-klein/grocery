package com.grocery.web.controllers.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;
import com.grocery.business.domain.service.ProductService;
import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.service.TenantService;

@Controller
@RequestMapping("/tenant/{tenantId}/products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @Autowired
    private TenantService tenantService;
        
    @GetMapping
    public String products(Model model, @PathVariable("tenantId")String tenantId) {
        
        // add products to model
        model.addAttribute("page", "products");
        model.addAttribute("productsByCategory", productService.getProductsByCategory(tenantId));

        return "products";
    }
    
    @PostMapping
    public String addProduct(@PathVariable("tenantId") String tenantId, @Validated @ModelAttribute Product product, BindingResult result) {
        if(result.hasErrors()) {
            return String.format("redirect:/tenant/%s/products", tenantId);
        }
        productService.addProduct(tenantId, product);

        return String.format("redirect:/tenant/%s/products", tenantId);
    }

    @DeleteMapping
    public String deleteProduct(@PathVariable("tenantId") String tenantId, @RequestParam("id") int id) {
        this.productService.deleteProduct(tenantId, id);
        return String.format("redirect:/tenant/%s/products", tenantId);
    }
}
