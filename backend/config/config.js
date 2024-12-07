const mysql = require("mysql");

const host = "localhost";
const user = "root";
const password = "ifsp";
const database = "SEP";

const connexionDB = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

connexionDB.connect((erro) => {
    if (erro) {
        console.log(`Falha ao se conectar com o MySQL: ${erro}`);
    }
    else {
        console.log(`Conexão efetuada com sucesso`);
    }
});

module.exports = connexionDB;