package com.grocery.web.controllers.api;

import java.io.IOError;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.util.Map;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MessageController {
    
    @GetMapping("/messages")
    public ResponseEntity<Map<String, String>> getMessages(java.util.Locale locale) throws IOException {
        Resource resource = new ClassPathResource(String.format("Messages_%s.properties", locale.getLanguage()));
        Properties props = new Properties();
        
        props.load(new InputStreamReader(new FileInputStream(resource.getFile().getPath()), "UTF-8"));

        Map step1 = props;
        return new ResponseEntity<Map<String,String>>((Map<String,String>)step1, HttpStatus.OK);

    }
}
