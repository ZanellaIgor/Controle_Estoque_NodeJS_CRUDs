const {Pool} =require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost', // ou o host do seu banco de dados
    database: 'postgres',
    password: '1234',
    port: 5432, // Porta padrão do PostgreSQL
  });

  module.exports = {pool};
