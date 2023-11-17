package com.ucu.obligatoriobasededatos2023.agenda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    agendaService.addagenda(agenda);
    }

    @DeleteMapping(path = "{nro}")
    public void deleteAgenda(@PathVariable("nro") long nro) {
        agendaService.deleteAgenda(nro);
    }

}