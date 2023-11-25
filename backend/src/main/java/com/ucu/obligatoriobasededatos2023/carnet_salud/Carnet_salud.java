package com.ucu.obligatoriobasededatos2023.carnet_salud;


import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@IdClass(Carnet_saludId.class)
@Table(name = "carnet_salud")
public class Carnet_salud  {

    @Column(name = "Fch_Vencimiento")
    private Date fecha_vencimiento;


    @Id
    @ManyToOne
    @JoinColumn(name = "ci")
    private Funcionario ci;

    @Id
    @Column(name = "fch_emision")
    private Date fecha_emision;

    @Lob
    @Column(name = "Comprobante", columnDefinition = "BLOB")
    private byte[] comprobante;


    public Carnet_salud(Funcionario ci, Date fecha_emision, Date fecha_vencimiento, byte[] comprobante) {
        this.ci = ci;
        this.fecha_emision = fecha_emision;
        this.fecha_vencimiento = fecha_vencimiento;
        this.comprobante = comprobante;
    }



    public Carnet_salud() {

    }

    public Funcionario getCi() {
        return ci;
    }

    public void setCi(Funcionario ci) {
        this.ci = ci;
    }

    public Date getFecha_emision() {
        return fecha_emision;
    }

    public void setFecha_emision(Date fecha_emision) {
        this.fecha_emision = fecha_emision;
    }

    public Date getFecha_vencimiento() {
        return fecha_vencimiento;
    }

    public void setFecha_vencimiento(Date fecha_vencimiento) {
        this.fecha_vencimiento = fecha_vencimiento;
    }

    public byte[] getComprobante() {
        return comprobante;
    }

    public void setComprobante(byte[] comprobante) {
        this.comprobante = comprobante;
    }



}
