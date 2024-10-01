const express = require("express");
const db = require("./config/config");
const cors = require("cors");
const PORT = 8000;

const app = express();
app.use(cors());

app.use(express.json());
app.set('json spaces', 2);

app.get("/", (req, res) => {
    res.send("<h2> Site para cadastro de torcedores do palmeiras </h2>");
});

app.get("/api/torcedores", (req, res) => {
    const sql = `SELECT * FROM torcedores;`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.send("<h2> Falha ao fazer a consulta </h2>");
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

app.listen(PORT, () => {
    console.log(`Servidor rodando na url http://localhost:${PORT}`);
});