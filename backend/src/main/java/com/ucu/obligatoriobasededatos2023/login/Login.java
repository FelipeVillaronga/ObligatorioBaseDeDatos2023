package com.ucu.obligatoriobasededatos2023.login;


import jakarta.persistence.*;

@Entity
@Table(name = "login")
public class Login {

    @Id
    @Column(name = "LogId")
    private long logId;

    @Column(name = "Password")
    private String password;



    public Login(long logId, String password) {
        this.logId = logId;
        this.password = password;
    }

    public Login() {

    }

    public long getLogId() {
        return logId;
    }

    public void setLogId(long logId) {
        this.logId = logId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }


}
