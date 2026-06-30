import React from 'react';
import './style.css';

export default function Home() {
  return (
    <main className="home-container">

      <header className="home-header">

        <h1> ERP Nexus</h1>

        <p>
          Bem-vindo ao sistema de gestão interna da
          <strong> TechNexus Solutions</strong>.
        </p>

      </header>

      <section className="welcome-card">

        <h2>Seja Bem-vindo!</h2>

        <p>
          Gerencie clientes e funcionários de forma simples,
          rápida e organizada através de uma plataforma moderna,
          desenvolvida para centralizar todas as informações da empresa.
        </p>

      </section>

      <section className="home-content">

        <div className="info-card">

          <div className="card-icon">
            👥
          </div>

          <h3>Gestão de Clientes</h3>

          <p>
            Cadastre, consulte e acompanhe todos os clientes da empresa
            em um único lugar, mantendo os dados sempre organizados.
          </p>

        </div>

        <div className="info-card">

          <div className="card-icon">
            👨‍💼
          </div>

          <h3>Gestão de Funcionários</h3>

          <p>
            Organize colaboradores, cargos, setores e facilite
            o gerenciamento interno da empresa.
          </p>

        </div>

      </section>

    </main>
  );
}

