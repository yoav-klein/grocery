
package com.grocery.web.controllers.ui.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import com.grocery.business.domain.model.FixedList;
import com.grocery.business.domain.model.ProductCategory;
import com.grocery.business.domain.model.QuantityType;
import com.grocery.business.domain.service.FixedListsService;
import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.business.tenancy.service.TenantService;

@ControllerAdvice("com.grocery.web.controllers.ui.app")
public class GlobalAppControllerAdvice {

    @Autowired
    private TenantService tenantService;

    @Autowired
    private FixedListsService fixedListsService;

    @ModelAttribute("tenant")
    public void addTenantToModel(Model model, @PathVariable("tenantId") String tenantId) throws UserNotFoundException {
        model.addAttribute("tenant", tenantService.getTenantById(tenantId));
    }

    @ModelAttribute("allQuantityTypes") 
    public QuantityType[] populateAllTypes() {
        return QuantityType.values();
    }

    @ModelAttribute("allCategories")
    public ProductCategory[] populateAllCategories() {
        return ProductCategory.values();
    }

    @ModelAttribute("allFixedLists")
    public List<FixedList> allFixedLists(@PathVariable("tenantId") String tenantId) {
        return fixedListsService.getAllFixedLists(tenantId);
    }

}