const mysql = require("mysql");

const hostname = "i3rw1.h.filess.io";
const database = "palmeirasDB2024_leaveplate";
const port = "3306";
const username = "palmeirasDB2024_leaveplate";
const password = "581111afb4d97b71fa30091e28097bfabe82c448";

const pool = mysql.createPool({
    host: hostname,
    user: username,
    password: password,
    database: database,
    port: port,
    connectionLimit: 10
});

pool.getConnection((erro, connection) => {
    if (erro) {
        console.error("Falha ao conectar ao banco de dados:", erro);
    } else {
        console.log("Conexão efetuada com sucesso com o MySQL");
        connection.release();
    }
});

module.exports = pool;