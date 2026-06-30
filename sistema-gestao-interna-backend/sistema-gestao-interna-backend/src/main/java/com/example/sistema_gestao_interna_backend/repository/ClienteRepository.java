package com.example.sistema_gestao_interna_backend.repository;

import com.example.sistema_gestao_interna_backend.model.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel, Long> {
}
