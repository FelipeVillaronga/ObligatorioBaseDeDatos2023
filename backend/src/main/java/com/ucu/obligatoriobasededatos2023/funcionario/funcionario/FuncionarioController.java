package com.ucu.obligatoriobasededatos2023.funcionario.funcionario;

import com.ucu.obligatoriobasededatos2023.login.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/funcionarios")
public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    @Autowired
    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public List<Funcionario> getFuncionarios() {
        return funcionarioService.getFuncionarios();
    }

    @PostMapping
    public void addFuncionario(@RequestBody Funcionario funcionario) {
        funcionarioService.addFuncionario(funcionario);
    }

    @DeleteMapping(path = "{ci}")
    public void deleteFuncionario(@PathVariable("ci") long ci) {
        funcionarioService.deleteFuncionario(ci);
    }

}