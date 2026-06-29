import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Clientes from './pages/Clientes';
import './App.css';

// Importações temporárias de simulação (seus colegas vão substituir pelos componentes reais)
const HomePlaceholder = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Bem-vindo ao ERP Nexus</h2><p>Dashboard em desenvolvimento pelo integrante 2.</p></div>;
const FuncionariosPlaceholder = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Gestão de Funcionários</h2><p>Tela em desenvolvimento pelo integrante 3.</p></div>;

function App() {
  // Estado que controla qual página está visível no momento
  const [view, setView] = useState('home');

  // Função que renderiza a tela correta com base no estado 'view'
  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomePlaceholder />; // Trocar por <Home /> quando seu colega terminar
      case 'clientes':
        return <Clientes />;
      case 'funcionarios':
        return <FuncionariosPlaceholder />; // Trocar por <Funcionarios /> quando seu colega terminar
      default:
        return <HomePlaceholder />;
    }
  };

  return (
    <div className="app-container">
      {/* Navbar fixa recebendo o controle de estado por Props */}
      <Navbar currentView={view} setView={setView} />
      
      {/* Conteúdo dinâmico da aplicação */}
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;