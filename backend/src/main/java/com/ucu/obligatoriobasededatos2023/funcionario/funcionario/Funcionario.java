package com.ucu.obligatoriobasededatos2023.funcionario.funcionario;


import com.ucu.obligatoriobasededatos2023.login.Login;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;

@Entity
@Table(name = "funcionarios")
@CrossOrigin(origins = "http://localhost:4200")
public class Funcionario {

    @Id
    @Column(name = "Ci")
    private long ci;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Apellido")
    private String apellido;

    @Column(name = "Fch_Nacimiento")
    private Date fchNacimiento;

    @Column(name = "Direccion")
    private String direccion;

    @Column(name = "Telefono")
    private String telefono;

    @Column(name = "Email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "LogId", referencedColumnName = "LogId")
    private Login login;



    public Funcionario(long ci, String nombre,String apellido, Date fchNacimiento, String direccion, String telefono, String email, Long logId, String password) {
        this.ci = ci;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fchNacimiento = fchNacimiento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.login = new Login(logId, password);
    }

    public Funcionario() {

    }
    public long getCi() {
        return ci;
    }
    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setCi(long ci) {
        this.ci = ci;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFchNacimiento() {
        return fchNacimiento;
    }

    public void setFchNacimiento(Date fchNacimiento) {
        this.fchNacimiento = fchNacimiento;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Login getLogin() {
        return login;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

}
