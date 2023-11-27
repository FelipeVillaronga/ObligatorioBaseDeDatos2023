package com.ucu.obligatoriobasededatos2023.login;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    private final LoginRepository loginRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(LoginRepository loginRepository, BCryptPasswordEncoder passwordEncoder) {
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public List<Login> getLogins() {
        return loginRepository.findAll();
    }

    public Login addLogin(Login login) {
        String storedPasswordHash = loginRepository.findLoginByLogId(login.getLogId());
        System.out.println(storedPasswordHash);
        System.out.println(login.getLogId());
        System.out.println(login.getPassword());

        if (storedPasswordHash == null) {
            System.out.println("API: Contraseña inválida");
            return null;
        }

        // Utilizar BCryptPasswordEncoder.matches para comparar contraseñas
        if (passwordEncoder.matches(login.getPassword(), storedPasswordHash)) {
            System.out.println("Éxito");
            return login;
        } else {
            System.out.println("API: Contraseña incorrecta");
            return null;
        }
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
        return logId == 1 && password.equals(login.getPassword());
    }

    public void deleteLogin(long logId) {
        boolean loginExists = loginRepository.existsById(logId);
        if (loginExists){
            loginRepository.deleteById(logId);
        }
    }
}
