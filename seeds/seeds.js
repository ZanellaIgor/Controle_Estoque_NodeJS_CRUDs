const { pool } = require('../conexao/db');

const createTableProducts = `
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    referencia VARCHAR(255) UNIQUE NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    estoque INTEGER NOT NULL
);
`;

const createTableClients = `
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    tipo VARCHAR(255),
    cpf_cnpj VARCHAR(255),
    inscricao_estadual VARCHAR(255),
    email VARCHAR(255),
    telefone VARCHAR(255),
    cep VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255),
    rua VARCHAR(255),
    bairro VARCHAR(255),
    numero VARCHAR(255)
);
`;

const createTableDocuments = `
CREATE TABLE IF NOT EXISTS documentos (
    id SERIAL PRIMARY KEY,
    id_pessoa INTEGER NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    data_emissao DATE NOT NULL,
    CONSTRAINT fk_cliente
      FOREIGN KEY(id_pessoa) 
      REFERENCES clientes(id)
);
`;

const createTables = async () => {
  console.log('sss');
  try {
    await pool.query('BEGIN');

    await pool.query(createTableClients);
    console.log('Tabela clientes criada com sucesso!');

    await pool.query(createTableProducts);
    console.log('Tabela produtos criada com sucesso!');

    await pool.query(createTableDocuments);
    console.log('Tabela documentos criada com sucesso!');

    await pool.query('COMMIT');
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error('Erro ao criar as tabelas:', err);
  } finally {
    pool.end();
  }
};

createTables();
