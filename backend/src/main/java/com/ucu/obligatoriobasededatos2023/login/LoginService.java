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
        if(password.equals(login.getPassword())){
            return login;
        }
        return null;
    }
    public void addNewLogin(Login login) {
        try {
            loginRepository.save(login);
        } catch (DataIntegrityViolationException ex) {
            // Manejar la excepción específica, por ejemplo, mostrar un mensaje de error.
            // También puedes realizar alguna acción específica según tus necesidades.
            System.err.println("Error: El usuario ya existe con el mismo LogId.");
        }
    }



    public void deleteLogin(long logId) {
        boolean loginExists = loginRepository.existsById(logId);
        if (loginExists){
            loginRepository.deleteById(logId);
        }
    }
}
