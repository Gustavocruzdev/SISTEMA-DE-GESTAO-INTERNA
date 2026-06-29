import React from 'react';
import './style.css';

export default function Home() {
  return (
    <main className="home-container">
      <header className="home-header">
        <h1>Bem-vindo ao ERP Nexus</h1>
        <p>Sistema de Gestão Interna da TechNexus Solutions</p>
      </header>

      <section className="home-content">
        <div className="info-card">
          <h3>Gestão de Clientes</h3>
          <p>Cadastre e visualize todos os parceiros de negócios de forma centralizada, eliminando a dependência de planilhas.</p>
        </div>

        <div className="info-card">
          <h3>Gestão de Funcionários</h3>
          <p>Controle o quadro de colaboradores, organizando dados por cargos e setores de maneira eficiente.</p>
        </div>
      </section>
    </main>
  );
}