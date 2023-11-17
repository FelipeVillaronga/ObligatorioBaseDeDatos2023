package com.ucu.obligatoriobasededatos2023.agenda;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AgendaService {
    private final AgendaRepository agendaRepository;

    @Autowired
    public AgendaService(AgendaRepository agendaRepository) {
        this.agendaRepository = agendaRepository;
    }

    public List<Agenda> getAgendas() {
        return agendaRepository.findAll();
    }

    public void addAgenda(Agenda agenda) {
        agendaRepository.save(agenda);
    }

    public List<Agenda> getAgendasLibres() {
        return agendaRepository.findAgendasLibres();
    }

    public void deleteAgenda(long nro) {
        boolean agendaExists = agendaRepository.existsById(nro);
        if (agendaExists){
            agendaRepository.deleteById(nro);
        }

    }

    public void updateAgenda(Date fchAgenda, Agenda agenda) {
        agendaRepository.delete(agenda);
        Agenda agendaNueva = new Agenda(agenda.getNro(), agenda.getCi(), fchAgenda);
        agendaRepository.save(agendaNueva);
    }
}
