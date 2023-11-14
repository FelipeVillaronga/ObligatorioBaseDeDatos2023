package com.ucu.obligatoriobasededatos2023.agenda;

import com.ucu.obligatoriobasededatos2023.login.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
}
