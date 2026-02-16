package com.grocery.security;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.grocery.business.tenancy.model.User;
import com.grocery.business.tenancy.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AutoRegistrationSuccessHandler implements AuthenticationSuccessHandler {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
        OAuth2User oauth2User = token.getPrincipal();

        Map<String, Object> attrs = oauth2User.getAttributes();
        String email = (String) attrs.get("email");
        String name = (String) attrs.get("name");
        String sub = (String) attrs.get("sub");
        String pictureUrl = (String) attrs.get("picture");

        // check if the user already exists in the database
        if(userService.checkIfUserExists(sub)) {
            response.sendRedirect("/app");
            return;
        }

        logger.info("Registering new user: {} - {}", name, email);
        
        // if not, add them to the database
        User user = new User(sub, name, email, pictureUrl);
        userService.addUser(user);
        
        response.sendRedirect("/app"); // Redirect to home page after successful registration
    }
}