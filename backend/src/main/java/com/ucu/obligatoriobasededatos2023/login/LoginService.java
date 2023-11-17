package com.ucu.obligatoriobasededatos2023.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public boolean addLogin(Login login) {
        String password = loginRepository.findLoginByLogId(login.getLogId());
        return password.equals(login.getPassword());
    }

    public void deleteLogin(long logId) {
        boolean loginExists = loginRepository.existsById(logId);
        if (loginExists){
            loginRepository.deleteById(logId);
        }
    }
}
