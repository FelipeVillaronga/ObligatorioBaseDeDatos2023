package com.ucu.obligatoriobasededatos2023.periodos_actualizacion;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Periodo_actualizacionService {
    private final Periodo_actualizacionRepository periodo_actualizacionRepository;

    @Autowired
    public Periodo_actualizacionService(Periodo_actualizacionRepository Periodo_actualizacionRepository) {
        this.periodo_actualizacionRepository = Periodo_actualizacionRepository;
    }

    public List<Periodos_actualizacion> getPeriodo_actualizacion() {
        return periodo_actualizacionRepository.findAll();
    }

    public void addPeriodo_actualizacion(Periodos_actualizacion periodosActualizacion) {
        periodo_actualizacionRepository.save(periodosActualizacion);
    }

    public void deletePeriodo_actualizacion(long anio) {
        boolean periodo_actualizacionExists = periodo_actualizacionRepository.existsById(anio);
        if (periodo_actualizacionExists){
            periodo_actualizacionRepository.deleteById(anio);
        }

    }
}
