package com.ucu.obligatoriobasededatos2023.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping
    public List<Login> getLogins() {
        return loginService.getLogins();
    }

    @PostMapping
    public void addLogin(@RequestBody Login login) {
    loginService.addLogin(login);
    }

    @DeleteMapping(path = "{logId}")
    public void deleteLogin(@PathVariable("logId") long logId) {
        loginService.deleteLogin(logId);
    }

}