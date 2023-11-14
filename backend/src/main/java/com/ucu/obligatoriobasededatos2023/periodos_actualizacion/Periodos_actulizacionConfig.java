package com.ucu.obligatoriobasededatos2023.periodos_actualizacion;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.util.List;

@Configuration
public class Periodos_actulizacionConfig {
    @Bean
    CommandLineRunner Periodo_actualizacioncommandLineRunner(Periodo_actualizacionRepository periodo_actualizacionRepository) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return args -> {
            Periodos_actualizacion periodosActualizacion1 = new Periodos_actualizacion(
                2024,
                    1,
                    dateFormat.parse("2023-11-12"),
                    dateFormat.parse("2023-12-12")

            );
            Periodos_actualizacion periodosActualizacion2 = new Periodos_actualizacion(
                    2025,
                    2,
                    dateFormat.parse("2024-11-12"),
                    dateFormat.parse("2025-12-12")

            );

            periodo_actualizacionRepository.saveAll(List.of(periodosActualizacion1, periodosActualizacion2));
        };
    }
}
