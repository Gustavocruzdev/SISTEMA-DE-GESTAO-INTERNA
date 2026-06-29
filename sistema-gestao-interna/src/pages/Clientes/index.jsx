import React, { useState, useEffect } from 'react';
import { getClientes, createCliente } from '../../service/api';
import './style.css';

export default function Clientes() {
  // Estados para a listagem e controle do app
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Estados para o formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

  // Carrega os clientes ao renderizar a tela
  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    setLoading(true);
    setError('');
    try {
      const dados = await getClientes();
      setClientes(dados);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza o estado dos inputs do formulário dinamicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia o formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação básica antes de enviar
    if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await createCliente(formData);
      setSuccess('Cliente cadastrado com sucesso!');
      
      // Limpa o formulário
      setFormData({ nome: '', email: '', telefone: '', cpf: '' });
      
      // Atualiza a tabela com o novo cliente
      carregarClientes();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="clientes-container">
      <h2>Gestão de Clientes</h2>
      
      {/* Mensagens de Feedback */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Formulário de Cadastro */}
      <div className="form-card">
        <h3>Novo Cadastro</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome completo" />
          </div>
          
          <div className="form-group">
            <label>E-mail:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="exemplo@email.com" />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Telefone:</label>
              <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(00) 00000-0000" />
            </div>
            
            <div className="form-group">
              <label>CPF:</label>
              <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" />
            </div>
          </div>

          <button type="submit" className="btn-submit">Cadastrar Cliente</button>
        </form>
      </div>

      {/* Listagem de Clientes */}
      <div className="list-section">
        <h3>Clientes Cadastrados</h3>
        {loading ? (
          <p>Carregando dados...</p>
        ) : clientes.length === 0 ? (
          <p className="no-data">Nenhum cliente cadastrado até o momento.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>CPF</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={cliente.id || index}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.cpf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}