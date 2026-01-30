
package com.grocery.web.controllers.ui.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.grocery.business.domain.service.CurrentListService;

@Controller
@RequestMapping("/tenant/{tenantId}/currentList")
public class CurrentListController {

    @Autowired
    private CurrentListService currentListService;

    @GetMapping
    public String currentList(Model model, @PathVariable("tenantId") String tenantId) {
        // add to model current list of tenant
        model.addAttribute("page", "currlist");
        model.addAttribute("itemsByCategory", currentListService.getCurrentListByCategory(tenantId));
        
        return "current-list";
    }


}