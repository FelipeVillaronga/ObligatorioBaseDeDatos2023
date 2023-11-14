package com.ucu.obligatoriobasededatos2023.agenda;


import com.ucu.obligatoriobasededatos2023.carnet_salud.Carnet_saludId;
import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@IdClass(AgendaId.class)
@Table(name = "agenda")
public class Agenda {

    @Id
    @Column(name = "Nro")
    private long nro;

    @Id
    @ManyToOne
    @JoinColumn(name = "Ci")
    private Funcionario ci;

    @Column(name = "Fch_Agenda")
    private Date fch_agenda;

    public Agenda(long nro, Funcionario ci, Date fch_agenda) {
        this.nro = nro;
        this.ci = ci;
        this.fch_agenda = fch_agenda;
    }
    public long getNro() {
        return nro;
    }

    public void setNro(long nro) {
        this.nro = nro;
    }

    public Funcionario getCi() {
        return ci;
    }

    public void setCi(Funcionario ci) {
        this.ci = ci;
    }

    public Date getFch_agenda() {
        return fch_agenda;
    }

    public void setFch_agenda(Date fch_agenda) {
        this.fch_agenda = fch_agenda;
    }
    public Agenda() {

    }
}
