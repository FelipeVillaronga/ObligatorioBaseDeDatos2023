package com.ucu.obligatoriobasededatos2023;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
    @GetMapping
    public String getId(){
        return "hola";
    }
}
