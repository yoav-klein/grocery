
package com.grocery.web.controllers;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalController {
    
    @ModelAttribute("name")
    public String getName(@AuthenticationPrincipal Object user) {
        OAuth2User oauth2user = (OAuth2User)user;
        return oauth2user.getAttribute("name");
    }

    @ModelAttribute("pictureUrl")
    public String getPicture(@AuthenticationPrincipal Object user) {
        OAuth2User oauth2user = (OAuth2User)user;
        return oauth2user.getAttribute("picture");
    }

}