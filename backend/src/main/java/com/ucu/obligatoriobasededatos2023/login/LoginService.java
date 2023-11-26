package com.ucu.obligatoriobasededatos2023.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

    public Login addLogin(Login login) {
        String password = loginRepository.findLoginByLogId(login.getLogId());
        System.out.println(password);
        System.out.println(login.getLogId());
        System.out.println(login.getPassword());
        if (password == null) {
            System.out.println("API: contraseña invalida");
            return null;
        }
        if(password.equals(login.getPassword())){
            System.out.println("success");
            return login;
        }
        System.out.println("API: contraseña incorrecta");
        return null;
    }
    public void addNewLogin(Login login) {
        try {
            loginRepository.save(login);
        } catch (DataIntegrityViolationException ex) {
            
            System.err.println("Error: El usuario ya existe con el mismo LogId.");
        }
    }

    public boolean validateAdmin(Login login) {
        long logId = login.getLogId();
        System.out.println(logId);
        String password = loginRepository.findLoginByLogId(login.getLogId());
        System.out.println(password);
        return logId == 0 && password.equals(login.getPassword());
    }

    public void deleteLogin(long logId) {
        boolean loginExists = loginRepository.existsById(logId);
        if (loginExists){
            loginRepository.deleteById(logId);
        }
    }
}
