package com.grocery.business;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@ComponentScan
@EnableTransactionManagement
public class SpringBusinessConfig implements WebMvcConfigurer {
    public SpringBusinessConfig() {
        super();
    }
    
    

}
