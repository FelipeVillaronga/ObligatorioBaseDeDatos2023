package com.ucu.obligatoriobasededatos2023.funcionario.funcionario;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    private final FuncionarioRepository funcionarioRepository;
    private final LoginRepository loginRepository;

    @Autowired
    public FuncionarioService(FuncionarioRepository funcionarioRepository, LoginRepository loginRepository) {
        this.funcionarioRepository = funcionarioRepository;
        this.loginRepository = loginRepository;
    }
    public List<Funcionario> getFuncionarios() {
        return funcionarioRepository.findAll();
    }
    public Funcionario getFuncionario(long ci) {
        return funcionarioRepository.findById(ci).orElse(null);
    }

    public void addFuncionario(Funcionario funcionario) {
        loginRepository.save(funcionario.getLogin());
        funcionarioRepository.save(funcionario);
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

    public Funcionario getFuncionarioByLogId(long logId) {
        return funcionarioRepository.getFuncionarioByLogId(logId);
    }
}
