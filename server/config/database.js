const mysql2 = require("mysql2");

const connection = mysql2.createConnection(
    `mysql://root@localhost:3306/sistema_cadastro`
);

connection.connect(error => {
    if(error) throw error;
    console.log("Database connected");
});

module.exports = connection;