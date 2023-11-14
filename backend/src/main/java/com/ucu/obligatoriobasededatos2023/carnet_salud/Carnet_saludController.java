package com.ucu.obligatoriobasededatos2023.carnet_salud;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/carnet_salud")
public class Carnet_saludController {
    private final Carnet_saludService carnet_saludService;

    @Autowired
    public Carnet_saludController(Carnet_saludService carnetSaludService) {
        this.carnet_saludService = carnetSaludService;
    }

    @GetMapping
    public List<Carnet_salud> getCarnet_salud() {
        return carnet_saludService.getCarnet_salud();
    }

    @PostMapping
    public void addCarnet_salud(@RequestBody Carnet_salud carnet_salud) {
    carnet_saludService.addCarnet_salud(carnet_salud);
    }

    @DeleteMapping(path = "{ci}")
    public void deleteCarnet_salud(@PathVariable("ci") long ci) {
        carnet_saludService.deleteCarnet_salud(ci);
    }

}