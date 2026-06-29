import React from 'react';
import './style.css'; // O arquivo de estilo que já está criado na sua pasta

export default function Navbar({ currentView, setView }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <strong>ERP Nexus</strong>
      </div>
      <ul className="navbar-links">
        <li>
          <button 
            className={currentView === 'home' ? 'active' : ''} 
            onClick={() => setView('home')}
          >
            Home
          </button>
        </li>
        <li>
          <button 
            className={currentView === 'clientes' ? 'active' : ''} 
            onClick={() => setView('clientes')}
          >
            Clientes
          </button>
        </li>
        <li>
          <button 
            className={currentView === 'funcionarios' ? 'active' : ''} 
            onClick={() => setView('funcionarios')}
          >
            Funcionários
          </button>
        </li>
      </ul>
    </nav>
  );
}