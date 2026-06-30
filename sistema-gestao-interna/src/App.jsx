import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Funcionarios from './pages/Funcionarios';
import './App.css';

function App() {
  const [view, setView] = useState('home');

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

      <Navbar
        currentView={view}
        setView={setView}
      />

      <main className="main-content">
        {renderView()}
      </main>

    </div>
  );
}

export default App;