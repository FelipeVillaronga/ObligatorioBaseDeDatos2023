package com.ucu.obligatoriobasededatos2023.funcionario.funcionario;

import com.ucu.obligatoriobasededatos2023.login.Login;
import com.ucu.obligatoriobasededatos2023.login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionarioService {
    private final FuncionarioRepository funcionarioRepository;

    @Autowired
    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }
    public List<Funcionario> getFuncionarios() {
        return funcionarioRepository.findAll();
    }

    public void addFuncionario(Funcionario funcionario) {
        funcionarioRepository.save(funcionario);
    }

    public void deleteFuncionario(long ci) {
        boolean funcionarioExists = funcionarioRepository.existsById(ci);
        if (funcionarioExists){
            funcionarioRepository.deleteById(ci);
        }

    }
}
