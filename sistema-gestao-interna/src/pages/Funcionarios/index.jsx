import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import './style.css';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cargo: '',
    setor: ''
  });

  // Função para buscar funcionários ao carregar a página
  const fetchFuncionarios = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/funcionarios');
      setFuncionarios(response.data);
    } catch (err) {
      setError('Erro ao carregar a lista de funcionários. Verifique se o servidor está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // Atualiza o estado do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Envio do formulário (Cadastro)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await api.post('/funcionarios', formData);
      // Limpa o formulário após o sucesso
      setFormData({ nome: '', telefone: '', email: '', cargo: '', setor: '' });
      // Atualiza a lista na tela
      fetchFuncionarios();
      alert('Funcionário cadastrado com sucesso!');
    } catch (err) {
      setError('Erro ao cadastrar funcionário. Verifique os dados e tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="funcionarios-container">
      <h2>Gestão de Funcionários</h2>
      
      {error && <div className="error-message">{error}</div>}

      <section className="form-section">
        <h3>Cadastrar Novo Colaborador</h3>
        <form onSubmit={handleSubmit} className="funcionario-form">
          <div className="input-group">
            <input type="text" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleInputChange} required />
            <input type="text" name="cargo" placeholder="Cargo" value={formData.cargo} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <input type="text" name="setor" placeholder="Setor" value={formData.setor} onChange={handleInputChange} required />
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </section>

      <section className="list-section">
        <h3>Colaboradores Cadastrados</h3>
        {loading && funcionarios.length === 0 ? (
          <p>Carregando dados...</p>
        ) : (
          <div className="table-responsive">
            <table className="funcionarios-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Cargo</th>
                  <th>Setor</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.length > 0 ? (
                  funcionarios.map((func, index) => (
                    <tr key={index}>
                      <td>{func.nome}</td>
                      <td>{func.email}</td>
                      <td>{func.telefone}</td>
                      <td>{func.cargo}</td>
                      <td>{func.setor}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-state">Nenhum funcionário cadastrado ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}