const express = require("express");
const session = require("express-session");
const db = require("./config/config");
const cors = require("cors");
let bcrypt;
try {
    bcrypt = require("bcrypt");
} catch {
    bcrypt = require("bcryptjs");
}

const PORT = process.env.PORT || 8000;

const app = express();

// Configuração do CORS para permitir cookies entre domínios
app.use(cors({
    origin: ["https://projeto-de-web.vercel.app", "http://localhost:5173"],  // Substitua pelo domínio correto
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permite o envio de cookies
}));

app.use(express.json());
app.set("json spaces", 2);

// Configuração do Express Session
app.use(session({
    secret: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8552c541e2e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b8552c541e',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true se estiver usando HTTPS
        httpOnly: true,
        sameSite: 'none', // Necessário para cookies entre domínios
    },
}));

// Rota inicial
app.get("/", (req, res) => {
    res.send("<h2>Site para cadastro de torcedores do Palmeiras</h2>");
});

// Rota de autenticação
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
                    // Armazena os dados do usuário na sessão
                    req.session.user = {
                        nome: user.nome,
                        email: user.email
                    };

                    console.log(req.session.user);  // Verifique se a sessão está sendo armazenada

                    res.json({ 
                        success: true, 
                        message: "Autenticação bem-sucedida", 
                        user: { nome: user.nome, email: user.email } 
                    });
                } else {
                    res.status(401).json({ success: false, message: "Email ou senha inválidos" });
                }
            });
        } else {
            res.status(401).json({ success: false, message: "Email ou senha inválidos" });
        }
    });
});

// Rota para verificar a sessão do usuário
app.get("/api/session", (req, res) => {
    if (req.session.user) {
        res.json({ 
            success: true, 
            user: req.session.user 
        });
    } else {
        res.status(401).json({ success: false, message: "Nenhum usuário logado" });
    }
});

// Outras rotas...

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na URL http://localhost:${PORT}`);
});