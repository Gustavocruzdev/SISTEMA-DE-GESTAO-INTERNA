import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import './style.css';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cargo: '',
    setor: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setSaving(true);

    try {
      await api.post('/funcionarios', formData);

      setFormData({
        nome: '',
        telefone: '',
        email: '',
        cargo: '',
        setor: ''
      });

      setSuccess('Funcionário cadastrado com sucesso!');

      fetchFuncionarios();

    } catch (err) {
      setError('Erro ao cadastrar funcionário. Verifique os dados e tente novamente.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="funcionarios-container">

      <h2> Gestão de Funcionários</h2>

      <p className="subtitle">
        Cadastre colaboradores e acompanhe todos os registros em um só lugar.
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

      <section className="form-section">

        <h3> Novo Colaborador</h3>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <input
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleInputChange}
              autoComplete="name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="exemplo@email.com"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
            />

          </div>

          <div className="input-group">

            <input
              type="text"
              name="telefone"
              placeholder="(71) 99999-9999"
              value={formData.telefone}
              onChange={handleInputChange}
              autoComplete="tel"
              required
            />

            <input
              type="text"
              name="cargo"
              placeholder="Cargo"
              value={formData.cargo}
              onChange={handleInputChange}
              required
            />

          </div>

          <div className="input-group">

            <input
              type="text"
              name="setor"
              placeholder="Setor"
              value={formData.setor}
              onChange={handleInputChange}
              required
            />

            <button
              type="submit"
              disabled={saving}
            >
              {saving ? 'Cadastrando...' : 'Cadastrar Funcionário'}
            </button>

          </div>

        </form>

      </section>

      <section className="list-section">

        <h3> Funcionários Cadastrados</h3>

        {loading ? (

          <p className="loading">
            Carregando funcionários...
          </p>

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

                    <tr key={func.id || index}>
                      <td>{func.nome}</td>
                      <td>{func.email}</td>
                      <td>{func.telefone}</td>
                      <td>{func.cargo}</td>
                      <td>{func.setor}</td>
                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="empty-state"
                    >
                      Nenhum funcionário cadastrado.
                    </td>

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