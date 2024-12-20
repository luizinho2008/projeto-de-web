const mysql = require("mysql");

const hostname = "i3rw1.h.filess.io";
const database = "palmeirasDB2024_leaveplate";
const port = "3306";
const username = "palmeirasDB2024_leaveplate";
const password = "581111afb4d97b71fa30091e28097bfabe82c448";

const connexionDB = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database,
    port: port,
});

connexionDB.connect((erro) => {
    if(erro) {
        console.log(`Falha ao se conectar com o banco de dados`);
    }
    else {
        console.log(`Conexão efetuada com sucesso com o MySQL`);
    }
});

module.exports = connexionDB;