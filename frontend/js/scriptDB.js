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
                    <div class='buttons'>
                        <button class='deleta' onclick='deletaTorcedor(${torcedor.id})'>Deletar</button> <br> <br>
                        <a href='#formulario'><button class='edita' onclick='editaTorcedor(${torcedor.id})'>Editar</button></a>
                    </div>    
                </div>`;
    });
    document.getElementById("lista").innerHTML = html;
}

const gravaTorcedor = (event) => {
    event.preventDefault();
    const id = document.getElementById('id-torcedor').value;
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        linkImagem: document.getElementById('linkImagem').value
    };

    let api;
    let method;

    if(id) {
        api = `http://localhost:8000/api/torcedores/${id}`;
        method = 'PUT';
    } else {
        api = 'http://localhost:8000/api/torcedores';
        method = 'POST';
    }

    fetch(api, {
        method: method,
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
        document.getElementById("button").style.display = "block";
        document.getElementById("button-editar").style.display = "none";
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

const deletaTorcedor = (id) => {
    const decisao = confirm("Você realmente deseja apagar esse torcedor?");

    if(decisao) {
        const api = `http://localhost:8000/api/torcedores/${id}`;
        fetch(api, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer your-token-here',
            }
        })
        .then((response) => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
        })
        .then((data) => {
            console.log('Sucesso:', data);
            carregaTorcedores();
        })
        .catch((error) => {
            console.error('Erro:', error);
            carregaTorcedores();
        });
    }
};

const editaTorcedor = (id) => {
    const api = `http://localhost:8000/api/torcedores/${id}`;
    fetch(api)
    .then(resposta => {
        return resposta.json();
    })
    .then(resposta => {
        document.getElementById("id-torcedor").value = id;
        document.getElementById("nome").value = resposta[0].nome;
        document.getElementById("email").value = resposta[0].email;
        document.getElementById("telefone").value = resposta[0].telefone;
        document.getElementById("linkImagem").value = resposta[0].imagem;

        document.getElementById("button").style.display = "none";
        document.getElementById("button-editar").style.display = "block";
    })
    .catch(erro => {
        console.log(erro);
    });
}