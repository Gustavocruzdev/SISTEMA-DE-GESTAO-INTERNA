import React, { useEffect, useState } from 'react';
import { getClientes } from '../../service/api';
import api from '../../service/api';
import './style.css';

export default function Home() {

    const [clientes, setClientes] = useState(0);
    const [funcionarios, setFuncionarios] = useState(0);

    useEffect(() => {
        carregarDashboard();
    }, []);

    async function carregarDashboard() {

        try {

            const listaClientes = await getClientes();

            setClientes(listaClientes.length);

            const response = await api.get('/funcionarios');

            setFuncionarios(response.data.length);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <main className="home-container">

            <section className="home-banner">

                <h1>Bem-vindo ao ERP Nexus</h1>

                <p>
                    Sistema de Gestão Empresarial da TechNexus Solutions.
                </p>

            </section>

            <section className="stats">

                <div className="stat-card">

                    <h2>{clientes}</h2>

                    <span>Clientes Cadastrados</span>

                </div>

                <div className="stat-card">

                    <h2>{funcionarios}</h2>

                    <span>Funcionários Cadastrados</span>

                </div>

            </section>

            <section className="dashboard">

                <div className="dashboard-card">

                    <h3>Gestão de Clientes</h3>

                    <p>
                        Cadastre e consulte clientes rapidamente através do
                        sistema ERP Nexus.
                    </p>

                </div>

                <div className="dashboard-card">

                    <h3>Gestão de Funcionários</h3>

                    <p>
                        Organize colaboradores, setores e cargos de forma
                        simples e eficiente.
                    </p>

                </div>

            </section>

        </main>

    );

}