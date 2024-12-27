const mysql = require("mysql");

const pool = mysql.createPool({
    host: "d3mz4.h.filess.io",
    user: "palmeiras_rawgroupat",
    password: "bfd6e264fe8b1918d8dea25a51eb00b54e08c8d9",
    database: "palmeiras_rawgroupat",
    port: 3307
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