import axios from 'axios';

// Configuração da instância do Axios conectando com o Back-end Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8081', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Busca todos os clientes cadastrados
export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw new Error(error.response?.data?.message || "Não foi possível carregar a lista de clientes.");
  }
};

// Cadastra um novo cliente
export const createCliente = async (clienteData) => {
  try {
    const response = await api.post('/clientes', clienteData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    throw new Error(error.response?.data?.message || "Não foi possível realizar o cadastro do cliente.");
  }
};

export default api;