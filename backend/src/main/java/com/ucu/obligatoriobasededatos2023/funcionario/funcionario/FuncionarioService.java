package com.ucu.obligatoriobasededatos2023.funcionario.funcionario;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    private final FuncionarioRepository funcionarioRepository;
    private final LoginRepository loginRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    @Autowired
    public FuncionarioService(FuncionarioRepository funcionarioRepository, LoginRepository loginRepository, BCryptPasswordEncoder passwordEncoder) {
        this.funcionarioRepository = funcionarioRepository;
        this.loginRepository = loginRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public List<Funcionario> getFuncionarios() {
        return funcionarioRepository.findAll();
    }
    public Funcionario getFuncionario(long ci) {
        return funcionarioRepository.findById(ci).orElse(null);
    }

    public void deleteFuncionario(long ci) {
        boolean funcionarioExists = funcionarioRepository.existsById(ci);
        if (funcionarioExists){
            funcionarioRepository.deleteById(ci);
        }

    }

    public List<Funcionario> obtenerFuncionariosSinFormulario() {
        List<Funcionario> a = funcionarioRepository.findFuncionariosSinFormulario();
        for (Funcionario b: a
             ) {
            System.out.println(b.getApellido());
        }
    return a;
    }

    public void addFuncionario(Funcionario funcionario) {
        Long logId = funcionario.getLogin().getLogId();
        if (loginRepository.existsById(logId)) {
            throw new IllegalArgumentException("LogId is already in use");
        }

        //HASHEO
        String hashedPassword = passwordEncoder.encode(funcionario.getLogin().getPassword());
        funcionario.getLogin().setPassword(hashedPassword);

        loginRepository.save(funcionario.getLogin());
        funcionarioRepository.save(funcionario);
    }

    public Funcionario getFuncionarioByLogId(long logId) {
        return funcionarioRepository.getFuncionarioByLogId(logId);
    }
}
