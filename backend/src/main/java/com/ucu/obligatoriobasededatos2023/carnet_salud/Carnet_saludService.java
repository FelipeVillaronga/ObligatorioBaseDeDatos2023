package com.ucu.obligatoriobasededatos2023.carnet_salud;

import com.ucu.obligatoriobasededatos2023.login.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Carnet_saludService {
    @Autowired
    private final Carnet_saludRepository carnet_saludRepository;

    public Carnet_saludService(Carnet_saludRepository carnet_saludRepository) {
        this.carnet_saludRepository = carnet_saludRepository;
    }



    public List<Carnet_salud> getCarnet_salud() {
        return carnet_saludRepository.findAll();
    }

    public void addCarnet_salud(Carnet_salud carnet_salud) {
        carnet_saludRepository.save(carnet_salud);
    }

    public void deleteCarnet_salud(long ci) {
        boolean carnet_saludExists = carnet_saludRepository.existsById(ci);
        if (carnet_saludExists){
            carnet_saludRepository.deleteById(ci);
        }

    }
    public void updateCarnet_salud(long ci, Carnet_salud carnet_salud) {
        deleteCarnet_salud(ci);
        Carnet_salud c = new Carnet_salud(carnet_salud.getCi(), carnet_salud.getFecha_emision(), carnet_salud.getFecha_vencimiento(),carnet_salud.getComprobante());
        carnet_saludRepository.save(c);

    }
}