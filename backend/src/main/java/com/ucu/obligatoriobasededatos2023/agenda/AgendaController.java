package com.ucu.obligatoriobasededatos2023.agenda;

import com.ucu.obligatoriobasededatos2023.carnet_salud.Carnet_salud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "api/agenda")
@CrossOrigin(origins = "http://localhost:4200")
public class AgendaController {
    private final AgendaService agendaService;

    @Autowired
    public AgendaController(AgendaService agendaService) {
        this.agendaService = agendaService;
    }

    @GetMapping
    public List<Agenda> getAgendas() {
        return agendaService.getAgendas();
    }

    @PostMapping
    public void addAgenda(@RequestBody Agenda agenda) {
    agendaService.addAgenda(agenda);
    }
    @PutMapping(path = "{fch_agenda}")
    public void updateAgenga(@PathVariable("fch_agenda")Date fch_agenda, @RequestBody Agenda agenda) {
        agendaService.updateAgenda(fch_agenda, agenda);
    }

    @GetMapping(path = "/libres")
    public List<Agenda> getAgendasLibres() {
        return agendaService.getAgendasLibres();
    }

    @DeleteMapping(path = "{nro}")
    public void deleteAgenda(@PathVariable("nro") long nro) {
        agendaService.deleteAgenda(nro);
    }

}