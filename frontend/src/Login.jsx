import React from 'react';
import { useState } from 'react';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [redirectToSite, setRedirectToSite] = useState(false);

    const newUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8000/api/authenticate',
                { email, senha },
                { withCredentials: true }
            );

            if (response.status === 200) {
                setRedirectToSite(true);
            }
        } catch (error) {
            console.error('Erro ao autenticar:', error.response || error.message);
        }
    };

    if (redirectToSite) {
        return <Navigate to="/site"/>;
    }

    return (
        <div>
            <h1>Faça login no S.E.P</h1>

            <form id="form" onSubmit={newUser}>
                <label>Email: </label>
                <input type="text" id="email" name="email" onInput={(e) => setEmail(e.target.value)}/> <br/> <br/>

                <label>Senha: </label>
                <input type="password" id="senha" name="senha" onInput={(e) => setSenha(e.target.value)}/> <br/> <br/>

                <button type="submit" id="buttonLogin">Enviar</button>
            </form>
        </div>
    );
}

export default Login;