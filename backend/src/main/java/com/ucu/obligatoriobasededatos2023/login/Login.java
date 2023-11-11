package com.ucu.obligatoriobasededatos2023.login;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Login {
    @Id

    private  long logId;
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
}
