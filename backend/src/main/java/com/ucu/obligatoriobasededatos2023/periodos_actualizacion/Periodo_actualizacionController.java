package com.ucu.obligatoriobasededatos2023.periodos_actualizacion;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/periodo_actualizacion")
public class Periodo_actualizacionController {
    private final Periodo_actualizacionService periodo_actualizacionService;

    @Autowired
    public Periodo_actualizacionController(Periodo_actualizacionService periodo_actualizacionService) {
        this.periodo_actualizacionService = periodo_actualizacionService;
    }

    @GetMapping
    public List<Periodos_actualizacion> getPeriodo_actualizacion() {
        return periodo_actualizacionService.getPeriodo_actualizacion();
    }

    @PostMapping
    public void addPeriodo_actualizacion(@RequestBody Periodos_actualizacion periodo_actualizacion) {
    periodo_actualizacionService.addPeriodo_actualizacion(periodo_actualizacion);
    }

    @DeleteMapping(path = "{anio}")
    public void deletePeriodo_actualizacion(@PathVariable("anio") long anio) {
        periodo_actualizacionService.deletePeriodo_actualizacion(anio);
    }
    @PutMapping(path = "{anio}")
    public void updatePeriodo_actualizacion(@PathVariable("anio") long anio, @RequestBody Periodos_actualizacion periodo_actualizacion) {
        periodo_actualizacionService.updatePeriodo_actualizacion(anio,periodo_actualizacion);
    }

}