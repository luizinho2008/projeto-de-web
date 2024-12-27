import React, { useState, useEffect } from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [redirectToSite, setRedirectToSite] = useState(false);

    // Verifica se a sessão está ativa
    useEffect(() => {
        axios.get('https://projeto-de-web-2024.onrender.com/api/session', { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    setRedirectToSite(true);
                }
            })
            .catch(error => {
                console.error('Sessão expirada ou não autenticada:', error.response || error.message);
            });
    }, []);

    const newUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'https://projeto-de-web-2024.onrender.com/api/authenticate',
                { email, senha },
                { withCredentials: true }  // Permite o envio de cookies para o servidor
            );

            if (response.status === 200) {
                setRedirectToSite(true);
            }
        } catch (error) {
            console.error('Erro ao autenticar:', error.response || error.message);
        }
    };

    if (redirectToSite) {
        return <Navigate to="/site" />;
    }

    return (
        <div>
            <h1>Faça login no S.E.P</h1>

            <form id="form" onSubmit={newUser}>
                <label>Email: </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> <br /> <br />

                <label>Senha: </label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                /> <br /> <br />

                <button type="submit" id="buttonLogin">Enviar</button>
            </form>
        </div>
    );
};

export default Login;