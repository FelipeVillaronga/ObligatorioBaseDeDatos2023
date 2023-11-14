package com.ucu.obligatoriobasededatos2023.agenda;

import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.FuncionarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.List;

@Configuration
public class AgendaConfig {


    @Bean
    CommandLineRunner agendaCommandLineRunner(AgendaRepository agendaRepository,FuncionarioRepository funcionarioRepository) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Funcionario funcionario = funcionarioRepository.findById(56223274L).get();
        Funcionario funcionario2 = funcionarioRepository.findById(51818181L).get();

        return args -> {
            Agenda agenda1 = new Agenda(
                    1,funcionario, dateFormat.parse("2023-11-12")

            );
            Agenda agenda2 = new Agenda(
                    2,funcionario2, dateFormat.parse("2023-10-12")
            );

            agendaRepository.saveAll(List.of(agenda1, agenda2));
        };
    }
}
