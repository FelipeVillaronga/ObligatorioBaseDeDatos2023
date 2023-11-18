package com.ucu.obligatoriobasededatos2023.agenda;

import com.ucu.obligatoriobasededatos2023.login.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    @Query("SELECT a FROM Agenda a WHERE a.ci is null")
    List<Agenda> findAgendasLibres();

    @Query("SELECT a FROM Agenda a WHERE a.nro = ?1")
    Agenda getAgendaByNro(long nro);
}
