import React from 'react';
import { useState } from 'react';
import './Cadastro.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const newUser = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/usuarios', {
            nome,
            email,
            senha,
        })
        .then((response) => {
            setRedirectToLogin(true);
        })
    }

    if (redirectToLogin) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Faça cadastro no S.E.P</h1>

            <form id="form" onSubmit={newUser}>
                <label>Nome: </label>
                <input type="text" id="nome" name="nome" onInput={(e) => setNome(e.target.value)}/> <br/> <br/>

                <label>Email: </label>
                <input type="text" id="email" name="email" onInput={(e) => setEmail(e.target.value)}/> <br/> <br/>

                <label>Senha: </label>
                <input type="password" id="senha" name="senha" onInput={(e) => setSenha(e.target.value)}/> <br/> <br/>

                <button type="submit" id="buttonCad">Enviar</button>
            </form>

            <Link to="/login">
                <button id="aviso">
                    Já possui cadastro?
                </button>
            </Link>
        </div>
    );
}

export default Cadastro;