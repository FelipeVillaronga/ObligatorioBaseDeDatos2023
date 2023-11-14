package com.ucu.obligatoriobasededatos2023.periodos_actualizacion;

import com.ucu.obligatoriobasededatos2023.login.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Periodo_actualizacionRepository extends JpaRepository<Periodos_actualizacion, Long> {
}
