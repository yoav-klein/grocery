package com.grocery;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyController {
    
    @RequestMapping("/hello")
    public String sayHello(Model model) {
        model.addAttribute("message", "Hello, Spring MVC! This is using AbstractDispatcherServletInitializer.");
        return "hello"; // This corresponds to the view name
    }    
    
}
