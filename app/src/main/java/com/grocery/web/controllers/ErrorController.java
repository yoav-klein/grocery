package com.grocery.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorController {
    
    @GetMapping("/error404")
    public String error404() {
        return "html/error404";
    }

    @GetMapping("/error500")
    public String error500() {
        return "html/error500";
    }
}
