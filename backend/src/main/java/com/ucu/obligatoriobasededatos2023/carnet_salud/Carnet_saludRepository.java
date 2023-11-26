package com.ucu.obligatoriobasededatos2023.carnet_salud;

import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public interface Carnet_saludRepository extends JpaRepository<Carnet_salud, Long>, Serializable {

    @Query("SELECT c FROM Carnet_salud c  WHERE c.ci.ci=?1")
    Carnet_salud existsByCi(long ci);

    @Query("DELETE Carnet_salud c WHERE c.ci.ci=?1")
    void deleteByCi(long ci);
}
