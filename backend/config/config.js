const mysql = require("mysql");

const pool = mysql.createPool({
    host: "klkyk.h.filess.io",
    user: "palmeiras_greatlypan",
    password: "1851cd484b475016e688034ec4aed2b7a4a4662a",
    database: "palmeiras_greatlypan",
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