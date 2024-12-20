const express = require("express");
const db = require("./config/config");
const cors = require("cors");
let bcrypt;
try {
    bcrypt = require("bcrypt");
} catch (err) {
    console.warn("Erro ao carregar bcrypt nativo. Usando bcryptjs como fallback.");
    bcrypt = require("bcryptjs");
}

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());

app.use(express.json());
app.set('json spaces', 2);

app.get("/", (req, res) => {
    res.send("<h2>Site para cadastro de torcedores do Palmeiras</h2>");
});

app.post("/api/authenticate", (req, res) => {
    const { email, senha } = req.body;

    const sql = `SELECT * FROM usuarios WHERE email = '${email}'`;

    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.log("Erro ao consultar o banco de dados:", erro);
            res.status(500).send("<h2>Falha ao fazer a consulta no MySQL</h2>");
        } else {
            if (resultados.length === 1) {
                const user = resultados[0];

                bcrypt.compare(senha, user.senha, (err, isMatch) => {
                    if (err) {
                        console.log("Erro ao comparar as senhas:", err);
                        res.status(500).send("<h2>Erro ao verificar a senha</h2>");
                    } else if (isMatch) {
                        res.json({
                            success: true,
                            message: "Autenticação bem-sucedida",
                            user: {
                                nome: user.nome, 
                                email: user.email,
                            }
                        });
                    } else {
                        res.status(401).json({ success: false, message: "Email ou senha inválidos" });
                    }
                });
            } else {
                res.status(401).json({ success: false, message: "Email ou senha inválidos" });
            }
        }
    });
});

app.post("/api/usuarios", (req, res) => {
    const { nome, email, senha } = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.log("Erro ao gerar o hash da senha:", err);
            res.status(500).send("<h2>Erro ao gerar o hash da senha</h2>");
        } else {
            const sql = `INSERT INTO usuarios(nome, email, senha) VALUES('${nome}', '${email}', '${hash}')`;
            db.query(sql, (erro, resultados) => {
                if (erro) {
                    console.log("Erro ao inserir o usuário no banco:", erro);
                    res.status(500).send("<h2>Falha ao inserir usuário no MySQL</h2>");
                } else {
                    res.status(201).send(resultados);
                }
            });
        }
    });
});

app.get("/api/torcedores", (req, res) => {
    const sql = `SELECT * FROM torcedores;`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao fazer a consulta no MySQL</h2>" + erro);
        } else {
            res.json(resultados);
        }
    });
});

app.post("/api/torcedores", (req, res) => {
    const { nome, email, telefone, linkImagem } = req.body;
    const sql = `INSERT INTO torcedores(nome, email, telefone, imagem)
        VALUES('${nome}', '${email}', '${telefone}', '${linkImagem}')`;

    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao inserir torcedor no MySQL</h2>");
        } else {
            res.status(201).send(resultados);
        }
    });
});

app.get("/api/torcedores/:id", (req, res) => {
    const sql = `SELECT * FROM torcedores WHERE id = ${req.params.id};`;
    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao fazer a consulta no MySQL</h2>");
        } else {
            res.json(resultados);
        }
    });
});

app.put("/api/torcedores/:id", (req, res) => {
    const { nome, email, telefone, linkImagem } = req.body;
    const sql = `UPDATE torcedores SET 
        nome = '${nome}', email = '${email}', 
        telefone = '${telefone}', 
        imagem = '${linkImagem}' WHERE id = ${req.params.id};`;

    db.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).send("<h2>Falha ao atualizar torcedor no MySQL</h2>");
        } else {
            res.json(resultados);
        }
    });
});

app.delete("/api/torcedores/:id", (req, res) => {
    const sql = `DELETE FROM torcedores WHERE id = ${req.params.id};`;
    db.query(sql, (erro, resultados) => {
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