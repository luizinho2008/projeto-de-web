const carregaTorcedores = () => {
    const api = "http://localhost:8000/api/torcedores";
    fetch(api)
    .then(resposta => {
        return resposta.json();
    })
    .then(resposta => {
        console.log(`Dados recebidos: ${resposta}`);
        exibeTorcedores(resposta);
    })
    .catch(erro => {
        console.log(erro);
        document.getElementById("lista").innerHTML = "<h2>Falha ao consultar o MySQL</h2>";
    });
}

const exibeTorcedores = (resposta) => {
    let html = "";
    resposta.map(torcedor => {
        html += `<div class='torcedor-item'>
                    <img src='${torcedor.imagem}' class='torcedores-img' alt='imagem torcedor'>
                    <h2 class='torcedor-info'>(Nome: ${torcedor.nome}) (Telefone: ${torcedor.telefone}) (Email: ${torcedor.email})</h2>
                </div>`;
    });
    document.getElementById("lista").innerHTML = html;
}

const gravaTorcedor = (event) => {
    event.preventDefault();
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        linkImagem: document.getElementById('linkImagem').value
    };
    const api = 'http://localhost:8000/api/torcedores';
    fetch(api, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your-token-here',
        },
        body: JSON.stringify(dados),
    })
    .then((response) => {
    if (!response.ok) {
        throw new Error('Erro na requisição');
    }
    return response.json();
    })
    .then((data) => {
        console.log('Sucesso:', data);
        document.getElementById("form").reset();
        carregaTorcedores();
        document.getElementById("grava-sucess").style.display = "flex";
        setTimeout(() => {
            document.getElementById("grava-sucess").style.display = "none";
        }, 2500);
    })
    .catch((error) => {
        console.error('Erro:', error);
        carregaTorcedores();
        document.getElementById("grava-falha").style.display = "flex";
        setTimeout(() => {
            document.getElementById("grava-falha").style.display = "none";
        }, 2500);
    });
};