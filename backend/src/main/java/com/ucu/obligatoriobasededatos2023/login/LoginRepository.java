package com.ucu.obligatoriobasededatos2023.login;

import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
    @Query("SELECT l.password FROM Login l where l.logId = ?1")
    String findLoginByLogId(long logId);


}
