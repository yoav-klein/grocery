package com.grocery.web.controllers.ui;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.grocery.business.tenancy.exception.UserNotFoundException;
import com.grocery.security.model.SecurityUser;

@ControllerAdvice("com.grocery.web.controllers.ui")
public class GlobalFrontendAdvice {
    
    @ModelAttribute("user")
    public void addUserToModel(Model model, @AuthenticationPrincipal SecurityUser user) throws UserNotFoundException {
        model.addAttribute("user", user.getAppUser());
    }
}
