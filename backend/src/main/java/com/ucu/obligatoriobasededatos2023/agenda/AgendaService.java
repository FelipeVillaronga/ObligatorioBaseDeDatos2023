package com.ucu.obligatoriobasededatos2023.agenda;

import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Date;

@Service
public class AgendaService {
    private final AgendaRepository agendaRepository;
    private final FuncionarioRepository funcionarioRepository;

    @Autowired
    public AgendaService(AgendaRepository agendaRepository, FuncionarioRepository funcionarioRepository) {
        this.agendaRepository = agendaRepository;
        this.funcionarioRepository = funcionarioRepository;
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
        if (agendaExists) {
            agendaRepository.deleteById(nro);
        }

    }

    public boolean updateAgenda(long ci, String fchAgenda, long nro) throws ParseException {
        Funcionario f = funcionarioRepository.findById((long) ci).orElse(null);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        Date fechaAgenda = dateFormat.parse(fchAgenda);
        if (f != null) {
            Agenda agendaNueva = new Agenda(nro, f, fechaAgenda);
            agendaRepository.delete(agendaRepository.getAgendaByNro(nro));
            agendaRepository.save(agendaNueva);
            return true;
        }

        return false;
    }
}