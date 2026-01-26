package com.grocery.web.controllers.error;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController {
    // endpoint for custom page for 400
    @RequestMapping("/error400")
    public String error400() {
        return "errors/error400";
    }
}
