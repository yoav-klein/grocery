package com.grocery.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController {
    
    @RequestMapping("/error404")
    public String error404() {
        return "html/error404";
    }

    @RequestMapping("/error500")
    public String error500() {
        return "html/error500";
    }
}
