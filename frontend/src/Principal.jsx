import React, { useState, useEffect } from 'react';
import './Principal.css'
import Palmeiras from './imgs/palmeiras.png'
import Camisa from './imgs/camisa.jpg'
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

const Principal = () => {

  const [user, setUser] = useState("");
  const [torcedores, setTorcedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Verificando sessão...");
    axios.get('https://projeto-de-web-2024.onrender.com/api/session', { withCredentials: true })
      .then((resposta) => {
        console.log("Resposta da sessão:", resposta.data);
        if (!resposta.data?.user?.nome) {
          console.log("Usuário não autenticado, redirecionando para login...");
          navigate('/login');  // Redirecionando para login
        } else {
          setUser(resposta.data.user.nome);  // Definindo o nome do usuário
        }
      })
      .catch((erro) => {
        console.error("Erro ao buscar a sessão:", erro);
        console.log("Redirecionando para login devido ao erro...");
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    console.log("Verificando sessão...");
    axios.get('https://projeto-de-web-2024.onrender.com/api/torcedores')
    .then(resposta => {
      console.log(resposta.data);
      setTorcedores(resposta.data);
    })
  }, []);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [linkImagem, setImagem] = useState("");

  const newTorcedor = (event) => {
    event.preventDefault();
    axios.post('https://projeto-de-web-2024.onrender.com/api/torcedores', {nome, email, telefone, linkImagem})
    .then(resposta => {
      location.reload();
    })
  }

  const deletaTorcedor = (id) => {
    navigate(`/deletar/${id}`);
  }

  return (
    <div id="site">
        <section id="menu">
            <nav>
                <img src={Palmeiras} className="mt-5 ml-5" alt="logo-palmeiras" id="logo-palmeiras" />
                <div className="links mt-5 mr-5">
                    <a href="#msg"> <p className="neg"> Sobre </p> </a>
                    <a href="#formulario"> <p className="neg"> Cadastre-se </p> </a>
                    <a href="#endereco"> <p className="neg"> Onde localizamos </p> </a>
                    <a href="#socio-torcedores"> <p className="neg"> Nossos sócios </p> </a>
                </div>
            </nav>
        </section> <br />
        <section id="sobre">
            <h1 className="italic mt-5 center" id="principal">Quer jogar no maior do Brasil {user}?</h1>
            <img src={Camisa} alt="camisa" id="camisa" /> <br /> <br />
            <p id="msg" className="neg mt-5 ml-5">
                Se você é apaixonado por futebol
                e busca uma jornada repleta de desafios,
                glórias e oportunidades de crescimento,
                então é hora de jogar no Palmeiras!
                O Palmeiras não é apenas um clube de futebol,
                é uma verdadeira escola de vida,
                onde os sonhos se tornam realidade e as
                trajetórias se transformam em lendas.
                É uma verdadeira paixão que une milhões
                de corações em todo o mundo.
                É mais do que um jogo; é uma experiência
                que transcende o campo, enchendo os corações
                dos torcedores de emoção, orgulho e alegria.
                O Palmeiras é o maior do Brasil pois contêm:
                <br /> <br />
                Copa Rio (Torneio Internacional de Clubes Campeões): 1951 <br /> <br />
                Conmebol Libertadores: 1999, 2020 e 2021 <br /> <br />
                Campeonatos Brasileiros: 1960, 1967, 1967 (Taça Brasil), 1969, 1972, 1973, 1993, 1994, 2016, 2018, 2022 e 2023 <br /> <br />
                Copas do Brasil: 1998, 2012, 2015 e 2020 <br /> <br />
                Copa dos Campeões: 2000 <br /> <br />
                Supercopa do Brasil: 2023 <br /> <br />
                Campeonatos Paulistas: 1920, 1926, 1927, 1932, 1933, 1934, 1936, 1940, 1942, 1944, 1947, 1950, 1959, 1963, 1966, 1972, 1974, 1976, 1993, 1994, 1996, 2008, 2020, 2022, 2023 e 2024 <br /> <br />
                Torneios Rio-São Paulo: 1933, 1951, 1965, 1993 e 2000
            </p>
        </section> <br /> <br />
        <section id="contato">
            <h2> Formulário para Cadastro na Sociedade Esportiva Palmeiras </h2> <br /> <br /> <br />
            <div id="formulario">
                <form id="form" onSubmit={newTorcedor}>
                    <label> Digite o seu nome: </label>
                    <input type="text" id="nome" name="nome" onInput={(e) => setNome(e.target.value)}/> <br /> <br />
                    <label> Digite o seu email: </label>
                    <input type="email" id="email" name="email" onInput={(e) => setEmail(e.target.value)}/> <br /> <br />
                    <label> Digite o seu telefone: </label>
                    <input type="text" id="telefone" name="telefone" onInput={(e) => setTelefone(e.target.value)}/> <br /> <br />
                    <label> Insira o link de uma imagem sua para podermos te identificar </label> <br />
                    <input type="text" id="linkImagem" name="linkImagem" onInput={(e) => setImagem(e.target.value)}/>
                    <button type="submit" name="submit" id="button"> Enviar dados </button> <br /> <br />
                    <button type="button" id="button-editar"> Editar dados </button> <br /> <br />
                </form>
            </div>
        </section> <br /> <br />
        <section id="socio-torcedores">
            <h2> Veja todos os nossos sócio torcedores </h2> <br />
            <section id="lista">
              {
                torcedores.map(torcedor => (
                  <div className="torcedor-container" key={torcedor.id} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <p>{torcedor.nome}</p>
                    <p>{torcedor.email}</p>
                    <p>{torcedor.telefone}</p>
                    <img width={100} src={torcedor.imagem}/>
                    <button onClick={() => deletaTorcedor(torcedor.id)}>Excluir</button>
                    <button onClick={() => editarTorcedor(torcedor.id)}>Editar</button>
                  </div>
                ))
              }
            </section>
        </section>
    </div>
  );
}

export default Principal;