const express = require("express");
const db = require("./config/config");
const cors = require("cors");
const PORT = 8000;

const app = express();
app.use(cors());

app.use(express.json());
app.set('json spaces', 2);

app.get("/", (req, res) => {
    res.send("<h2>Site para cadastro de torcedores do palmeiras</h2>");
});

app.get("/api/torcedores", (req, res) => {
    const sql = `SELECT * FROM torcedores;`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.send("<h2>Falha ao fazer a consulta</h2>");
        }
        else {
            res.send(resultados);
        }
    });
});

app.post("/api/usuarios", (req, res) => {
    const sql = `INSERT INTO usuarios(email, senha) VALUES('${req.body.email}', '${req.body.senha}');`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.send("<h2>Falha ao inserir usuário no MySQL</h2>");
        }
        else {
            res.send(resultados);
        }
    });
});

app.get("/api/torcedores/:id", (req, res) => {
    const sql = `SELECT * FROM torcedores WHERE id = ${req.params.id};`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.send("<h2>Falha ao fazer a consulta</h2>");
        }
        else {
            res.send(resultados);
        }
    });
});

app.post("/api/torcedores", (req, res) => {
    const sql = `INSERT INTO torcedores(nome, email, telefone, imagem)
    VALUES('${req.body.nome}', '${req.body.email}', '${req.body.telefone}', '${req.body.linkImagem}');`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.send("<h2>Falha ao inserir torcedor no MySQL</h2>");
        }
        else {
            res.send(resultados);
        }
    });
});

app.delete("/api/torcedores/:id", (req, res) => {
    const sql = `DELETE FROM torcedores WHERE id = ${req.params.id};`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.send("<h2>Falha ao deletar torcedor no MySQL</h2>");
        }
        else {
            res.send(resultados);
        }
    });
});

app.put("/api/torcedores/:id", (req, res) => {
    const sql = `UPDATE torcedores SET 
        nome = '${req.body.nome}', email = '${req.body.email}', 
        telefone = '${req.body.telefone}', 
        imagem = '${req.body.linkImagem}' WHERE id = ${req.params.id};`;

    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.send("<h2>Falha ao atualizar torcedor no MySQL</h2>");
        } else {
            res.send(resultados);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na url http://localhost:${PORT}`);
});