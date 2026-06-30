package com.example.sistema_gestao_interna_backend.controller;

import com.example.sistema_gestao_interna_backend.model.FuncionarioModel;
import com.example.sistema_gestao_interna_backend.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping
    public ResponseEntity<List<FuncionarioModel>> listarTodos() {
        return ResponseEntity.ok(funcionarioRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<FuncionarioModel> cadastrar(@RequestBody FuncionarioModel funcionario) {
        FuncionarioModel novoFuncionario = funcionarioRepository.save(funcionario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoFuncionario);
    }
}
