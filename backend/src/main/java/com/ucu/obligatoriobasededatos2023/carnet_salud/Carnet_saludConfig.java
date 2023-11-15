package com.ucu.obligatoriobasededatos2023.carnet_salud;

import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.FuncionarioRepository;
import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.List;

@Configuration
public class Carnet_saludConfig {
    @Bean
    CommandLineRunner Carnet_saludCommandLineRunner(Carnet_saludRepository carnet_saludRepository, FuncionarioRepository funcionarioRepository) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Funcionario funcionario = funcionarioRepository.findById(56223274L).get();
        Funcionario funcionario2 = funcionarioRepository.findById(51818181L).get();
        return args -> {
            Carnet_salud carnet_salud1 = new Carnet_salud(
                    funcionario,
                    dateFormat.parse("2022-12-05"),
                    dateFormat.parse("2023-12-05"),
                    "1001"
            );


            carnet_saludRepository.saveAll(List.of(carnet_salud1, carnet_salud1));
        };
    }
}
