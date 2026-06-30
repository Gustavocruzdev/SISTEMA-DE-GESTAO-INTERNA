import React, { useState, useEffect } from 'react';
import { getClientes, createCliente } from '../../service/api';
import './style.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!formData.nome || !formData.email || !formData.telefone || !formData.cpf) {
      setError('Preencha todos os campos.');
      return;
    }

    setSaving(true);

    try {
      await createCliente(formData);

      setSuccess('Cliente cadastrado com sucesso!');

      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: ''
      });

      carregarClientes();

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="clientes-container">

      <h2> Gestão de Clientes</h2>

      <p className="subtitle">
        Cadastre clientes e visualize todos os registros em um só lugar.
      </p>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      <div className="form-card">

        <h3> Novo Cadastro</h3>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nome</label>

            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Digite o nome completo"
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="form-group-row">

            <div className="form-group">
              <label>Telefone</label>

              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                autoComplete="tel"
                placeholder="(71) 99999-9999"
              />
            </div>

            <div className="form-group">
              <label>CPF</label>

              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            </div>

          </div>

          <div className="button-area">

            <button
              className="btn-submit"
              type="submit"
              disabled={saving}
            >
              {saving ? "Cadastrando..." : "Cadastrar Cliente"}
            </button>

          </div>

        </form>

      </div>

      <div className="list-section">

        <h3> Clientes Cadastrados</h3>

        {loading ? (

          <p className="loading">
            Carregando clientes...
          </p>

        ) : clientes.length === 0 ? (

          <p className="no-data">
            Nenhum cliente cadastrado.
          </p>

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