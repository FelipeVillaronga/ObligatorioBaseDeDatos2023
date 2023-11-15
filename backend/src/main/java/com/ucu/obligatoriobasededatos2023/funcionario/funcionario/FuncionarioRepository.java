package com.ucu.obligatoriobasededatos2023.funcionario.funcionario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    @Query("SELECT f FROM Funcionario f LEFT JOIN Carnet_salud c ON f.ci = c.ci.ci WHERE c IS NULL")
    List<Funcionario> findFuncionariosSinFormulario();
}
