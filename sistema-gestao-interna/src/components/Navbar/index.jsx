import React from 'react';
import './style.css';

export default function Navbar({ currentView, setView }) {
  return (
    <aside className="navbar">

      <div className="navbar-logo">
        <h2>ERP Nexus</h2>
        <span>Sistema de Gestão Empresarial</span>
      </div>

      <nav className="navbar-menu">

        <button
          className={currentView === 'home' ? 'active' : ''}
          onClick={() => setView('home')}
        >
          Início
        </button>

        <button
          className={currentView === 'clientes' ? 'active' : ''}
          onClick={() => setView('clientes')}
        >
          Clientes
        </button>

        <button
          className={currentView === 'funcionarios' ? 'active' : ''}
          onClick={() => setView('funcionarios')}
        >
          Funcionários
        </button>

      </nav>

      <div className="navbar-footer">
        <p>ERP Nexus</p>
        <small>Versão 1.0</small>
      </div>

    </aside>
  );
}