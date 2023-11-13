package com.ucu.obligatoriobasededatos2023.login;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class LoginConfig {
    @Bean
    CommandLineRunner commandLineRunner(LoginRepository loginRepository) {
        return args -> {
            Login login1 = new Login(
                    1,
                    "login1"
            );
            Login login2 = new Login(
                    2,
                    "login2"
            );

            loginRepository.saveAll(List.of(login1, login2));
        };
    }
}
