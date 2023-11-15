package com.ucu.obligatoriobasededatos2023.mail;

import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.Funcionario;
import com.ucu.obligatoriobasededatos2023.funcionario.funcionario.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificacionDiaria {
    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private JavaMailSender javaMailSender;


    public void enviarMailDiario() {

        List<Funcionario> funcionariosSinFormulario = funcionarioService.obtenerFuncionariosSinFormulario();


        for (Funcionario funcionario : funcionariosSinFormulario) {
            enviarCorreoNotificacion(funcionario);
        }
    }

    private void enviarCorreoNotificacion(Funcionario funcionario) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(funcionario.getEmail());
        mensaje.setSubject("Recordatorio de Actualización de Datos");
        mensaje.setText("Hola " + funcionario.getNombre() + ",\n\nRecuerda completar tu formulario de actualización de datos.");

        javaMailSender.send(mensaje);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void ejecutarNotificacionesDiarias() {
        enviarMailDiario();
    }
}