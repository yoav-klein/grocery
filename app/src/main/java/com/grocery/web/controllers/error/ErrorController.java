package com.grocery.web.controllers.error;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/error")
public class ErrorController {
    // endpoint for custom page for 400
    @RequestMapping("/404")
    public String error400() {
        return "errors/404";
    }

    @RequestMapping("/500")
    public String error500() {
        return "errors/500";
    }
}
