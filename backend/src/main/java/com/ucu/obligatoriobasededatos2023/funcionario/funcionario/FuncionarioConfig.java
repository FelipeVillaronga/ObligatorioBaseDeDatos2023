package com.ucu.obligatoriobasededatos2023.funcionario.funcionario;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Date;
import java.util.List;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Configuration
public class FuncionarioConfig {

    @Bean
    CommandLineRunner funcionarioCommandLineRunner(FuncionarioRepository funcionarioRepository, LoginRepository loginRepository) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        return args -> {
            // Primero, guardas el Login si no existe
            Login login = new Login(1001, "contraseña");
            Login login2 = new Login(1002, "contraseña");
            loginRepository.saveAll(List.of(login, login2));

            // Luego, creas el Funcionario con la referencia al Login existente
            Funcionario funcionario1 = new Funcionario(
                    56223274,
                    "Tomas",
                    "Darracq",
                    dateFormat.parse("2002-12-05"),
                    "Punta Carretas",
                    "09009999",
                    "email@email.com",
                    login
            );

            Funcionario funcionario2 = new Funcionario(
                    51818181,
                    "Maria",
                    "Perez",
                    dateFormat.parse("2002-12-05"),
                    "Punta Carretas",
                    "09009888",
                    "email@email.com",
                    login2
            );

            funcionarioRepository.saveAll(List.of(funcionario1, funcionario2));
        };
    }
}

