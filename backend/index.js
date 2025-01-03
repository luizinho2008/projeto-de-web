const express = require("express");
const db = require("./config/config");
const cors = require("cors");
let bcrypt;
try {
    bcrypt = require("bcrypt");
} catch {
    bcrypt = require("bcryptjs");
}
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
    res.send("<h2>Site para cadastro de torcedores do Palmeiras</h2>");
});

app.post("/api/authenticate", (req, res) => {
    const { email, senha } = req.body;
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao fazer a consulta no MySQL</h2>");
        } else if (resultados.length === 1) {
            const user = resultados[0];
            bcrypt.compare(senha, user.senha, (err, isMatch) => {
                if (err) {
                    res.status(500).send("<h2>Erro ao verificar a senha</h2>");
                } else if (isMatch) {
                    const payload = {
                        id: user.id,
                        nome: user.nome
                    };
            
                    const token = jwt.sign(payload, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8552c541e2e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8552c541e', { expiresIn: '1h' });
                    res.status(200).json({ message: "Login bem-sucedido", token });
                } else {
                    res.status(401).json({ success: false, message: "Email ou senha inválidos" });
                }
            });
        } else {
            res.status(401).json({ success: false, message: "Email ou senha inválidos" });
        }
    });
});

app.post("/api/usuarios", (req, res) => {
    const { nome, email, senha } = req.body;
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            res.status(500).send("<h2>Erro ao gerar o hash da senha</h2>");
        } else {
            const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
            db.query(sql, [nome, email, hash], (erro, resultados) => {
                if (erro) {
                    res.status(500).send("<h2>Falha ao inserir usuário no MySQL</h2>");
                } else {
                    res.status(201).send(resultados);
                }
            });
        }
    });
});

app.get("/api/torcedores", (req, res) => {
    const sql = "SELECT * FROM torcedores";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao fazer a consulta no MySQL</h2>");
        } else {
            res.json(resultados);
        }
    });
});

app.post("/api/torcedores", (req, res) => {
    const { nome, email, telefone, linkImagem } = req.body;
    const sql = "INSERT INTO torcedores (nome, email, telefone, imagem) VALUES (?, ?, ?, ?)";
    db.query(sql, [nome, email, telefone, linkImagem], (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao inserir torcedor no MySQL</h2>");
        } else {
            res.status(201).send(resultados);
        }
    });
});

app.get("/api/torcedores/:id", (req, res) => {
    const sql = "SELECT * FROM torcedores WHERE id = ?";
    db.query(sql, [req.params.id], (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao fazer a consulta no MySQL</h2>");
        } else {
            res.json(resultados);
        }
    });
});

app.put("/api/torcedores/:id", (req, res) => {
    const { nome, email, telefone, linkImagem } = req.body;
    const sql = "UPDATE torcedores SET nome = ?, email = ?, telefone = ?, imagem = ? WHERE id = ?";
    db.query(sql, [nome, email, telefone, linkImagem, req.params.id], (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao atualizar torcedor no MySQL</h2>");
        } else {
            res.json(resultados);
        }
    });
});

app.delete("/api/torcedores/:id", (req, res) => {
    const sql = "DELETE FROM torcedores WHERE id = ?";
    db.query(sql, [req.params.id], (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao deletar torcedor no MySQL</h2>");
        } else {
            res.json(resultados);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na URL http://localhost:${PORT}`);
});