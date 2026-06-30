package com.example.sistema_gestao_interna_backend.repository;

import com.example.sistema_gestao_interna_backend.model.FuncionarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<FuncionarioModel, Long> {
}
