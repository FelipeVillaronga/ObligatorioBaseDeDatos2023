package com.ucu.obligatoriobasededatos2023.agenda;

import java.io.Serializable;
import java.util.Date;

public class AgendaId implements Serializable {
    private long nro;

    public long getNro() {
        return nro;
    }

    public void setNro(long nro) {
        this.nro = nro;
    }

    public Date getFch_agenda() {
        return fch_agenda;
    }

    public void setFch_agenda(Date fch_agenda) {
        this.fch_agenda = fch_agenda;
    }

    private Date fch_agenda;
}
