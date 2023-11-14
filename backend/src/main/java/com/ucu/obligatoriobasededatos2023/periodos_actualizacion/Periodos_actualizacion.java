package com.ucu.obligatoriobasededatos2023.periodos_actualizacion;


import com.ucu.obligatoriobasededatos2023.carnet_salud.Carnet_saludId;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "periodos_Actualizacion")
@IdClass(Periodo_actualizacionId.class)
public class Periodos_actualizacion {
    public Periodos_actualizacion() {

    }

    public long getAnio() {
        return anio;
    }

    public void setAnio(long anio) {
        this.anio = anio;
    }

    public long getSemestre() {
        return semestre;
    }

    public void setSemestre(long semestre) {
        this.semestre = semestre;
    }

    public Date getFch_inicio() {
        return fch_inicio;
    }

    public void setFch_inicio(Date fch_inicio) {
        this.fch_inicio = fch_inicio;
    }

    public Date getFch_fin() {
        return fch_fin;
    }

    public void setFch_fin(Date fch_fin) {
        this.fch_fin = fch_fin;
    }

    public Periodos_actualizacion(long anio, long semestre, Date fch_inicio, Date fch_fin) {
        this.anio = anio;
        this.semestre = semestre;
        this.fch_inicio = fch_inicio;
        this.fch_fin = fch_fin;
    }

    @Id
    @Column(name = "Anio")
    private long anio;
    @Id
    @Column(name = "Semestre")
    private long semestre;

    @Column(name = "Fch_Inicio")
    private Date fch_inicio;
    @Column(name = "Fch_Fin")
    private Date fch_fin;





}
