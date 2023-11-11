package com.ucu.obligatoriobasededatos2023.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class LoginService {
    private final LoginRepository loginRepository;

    @Autowired
    public LoginService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public List<Login> getLogins() {
        return loginRepository.findAll();
    }

    public void addLogin(Login login) {
        loginRepository.save(login);
    }

    public void deleteLogin(long logId) {
        boolean loginExists = loginRepository.existsById(logId);
        if (loginExists){
            loginRepository.deleteById(logId);
        }

    }
}
