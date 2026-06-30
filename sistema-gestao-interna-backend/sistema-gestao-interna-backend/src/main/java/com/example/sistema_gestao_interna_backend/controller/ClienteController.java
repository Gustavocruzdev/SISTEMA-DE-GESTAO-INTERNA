package com.example.sistema_gestao_interna_backend.controller;

import com.example.sistema_gestao_interna_backend.model.ClienteModel;
import com.example.sistema_gestao_interna_backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ResponseEntity<List<ClienteModel>> listarTodos() {
        return ResponseEntity.ok(clienteRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<ClienteModel> cadastrar(@RequestBody ClienteModel cliente) {
        ClienteModel novoCliente = clienteRepository.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
    }
}
