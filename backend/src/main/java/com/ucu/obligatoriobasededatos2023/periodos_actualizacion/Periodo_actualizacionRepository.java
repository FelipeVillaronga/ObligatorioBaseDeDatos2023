package com.ucu.obligatoriobasededatos2023.periodos_actualizacion;

import com.ucu.obligatoriobasededatos2023.login.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface Periodo_actualizacionRepository extends JpaRepository<Periodos_actualizacion, Long> {

    @Query("SELECT p.anio FROM Periodos_actualizacion p where p.anio = ?1")

    boolean existePeriodoEnElAnio(long anio);

    @Modifying
    @Query("DELETE FROM Periodos_actualizacion p WHERE p.anio = ?1")
    void deleteTodosDeAnio(long anio);


}
