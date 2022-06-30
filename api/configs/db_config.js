const env = process.env;
const fs = require('fs');
const db = {
    host: "localhost",
    user: "lorenzo",
    password: "senha"
};

module.exports = db;

//TODO:
// 1. Criar um arquivo ENV para armazenar as configurações do banco de dados