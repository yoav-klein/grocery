package com.grocery.web.controllers.ui.app;

import java.util.List;
import java.util.Map;

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

import com.grocery.business.domain.dto.ProductRequest;
import com.grocery.business.domain.exception.ProductAlreadyExistsException;
import com.grocery.business.domain.model.Product;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.service.ProductService;

@Controller
@RequestMapping("/tenant/{tenantId}/products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @ModelAttribute("page")
    public String page() { return "products"; }

    @ModelAttribute("productsByCategory")
    public Map<ProductCategory, List<Product>> productsByCategory(@PathVariable("tenantId")String tenantId) {
        return productService.getProductsByCategory(tenantId);
    }
        
    @GetMapping
    public String products(Model model, @PathVariable("tenantId")String tenantId) {        
        // add products to model
        model.addAttribute("product", new ProductRequest());

        return "products";
    }
    
    @PostMapping
    public String addProduct(Model model, @PathVariable("tenantId") String tenantId, @ModelAttribute("product") @Validated ProductRequest product, BindingResult result) {
        // check for binding errors
        if(result.hasErrors()) {
            model.addAttribute("productsByCategory", productService.getProductsByCategory(tenantId));
            return "products";
        }

        // if product with same name+category already exists, add an error to the BindingResult
        try {
            productService.addProduct(tenantId, product);
        } catch(ProductAlreadyExistsException e) {
            result.rejectValue("name", "duplicate.product", new Object[] {e.name, e.category}, "Product already exists in this category");
            return "products";
        }

        return String.format("redirect:/tenant/%s/products", tenantId);
    }

    @DeleteMapping
    public String deleteProduct(@PathVariable("tenantId") String tenantId, @RequestParam("id") int id) {
        this.productService.deleteProduct(tenantId, id);
        return String.format("redirect:/tenant/%s/products", tenantId);
    }
}
