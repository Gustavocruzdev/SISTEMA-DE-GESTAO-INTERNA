import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Funcionarios from './pages/Funcionarios';
import './App.css';

function App() {
  // Estado que controla qual página está ativa e visível na tela
  const [view, setView] = useState('home');

  // Função dinâmica que renderiza a página selecionada na Navbar
  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home />;
      case 'clientes':
        return <Clientes />;
      case 'funcionarios':
        return <Funcionarios />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      {/* Navbar que gerencia a troca de telas através do estado 'view' */}
      <Navbar currentView={view} setView={setView} />
      
      {/* Container principal que exibe o componente ativo */}
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;