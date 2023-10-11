const express = require('express');
const routerClientes = express.Router();
const { pool } = require('../conexao/db');


routerClientes.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM PESSOAS'
        const resultadoBanco = await pool.query(query);
        if (resultadoBanco.rows.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Nenhum Cliente encontrado.',
            })
        };
        res.status(200).json({
            statusCode: 200,
            message: 'Lista de Clientes',
            data: resultadoBanco.rows,
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: 'Erro ao realizar a consulta.',
        });
    }
});

routerClientes.get('/search', async (req, res) => {
    const { nome, cidade } = req.query;
    console.log(req.query)
    let query = `SELECT * FROM PESSOAS WHERE lower(NOME) LIKE '%' || $1 || '%' AND lower(CIDADE) LIKE '%' || $2 || '%'`;
    let values = [ nome ? nome.toLowerCase() : '', cidade ? cidade.toLowerCase() : '']
   
    try {
        const result = await pool.query(query, values);
        console.log(result.rows)
        res.status(200).json({
            statusCode: 200,
            message: "Consulta realizada",
            data: result.rows
        });

    } catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao realizar a consulta no banco de dados",
        });
    }
});

routerClientes.post('/', async (req, res) => {
    console.log(req.body)
    const { nome, tipo, cpfCnpj, ie, bairro, email, telefone, cep, cidade, estado, rua, numero, complemento } = req.body;
    if(!nome || !cep){
        return res.status(500).json({ error: 'Os campos Nome e CEP são obrigatórios.' });
    }
    if(!cidade || !estado){
        return res.status(500).json({ error: 'Ao digitar o CEP clique em pesquisar.' });
    }
    try {
        const insertQuery = `INSERT INTO PESSOAS (
            nome,
            tipo,
            cpf_cnpj,
            inscricao_estadual,
            email,
            telefone,
            cep, 
            cidade,
            estado,
            rua,
            bairro,
            numero,
            complemento)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING id;`;

        const novaPessoa = [
            nome,
            tipo,
            cpfCnpj,
            ie,
            email,
            telefone,
            cep,
            cidade,
            estado,
            rua,
            bairro,
            numero,
            complemento
        ];
        console.log(novaPessoa)
        const { rows } = await pool.query(insertQuery, novaPessoa);
        const novaPessoaID = rows[0].id;
        res.status(201).json({
            statusCode: 201,
            message: "Cliente criado com Sucesso",
            novaPessoaID,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao criar o Pessoa.",
        });
    }

});



routerClientes.get('/contagem', async (req, res) => {
    try {
        const query = 'SELECT COUNT(*) FROM PESSOAS';
        const result = await pool.query(query);
        const count = result.rows[0].count;
        res.json({ count });
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ error: 'Erro na consulta' });
    }
});

routerClientes.get('/cidades', async (req, res) => {
    try {
        const query = 'SELECT CIDADE, COUNT(*) FROM PESSOAS group by CIDADE order by 2 DESC LIMIT 5';
        const result = await pool.query(query);
        const rows = result.rows;
        res.json({ rows });
    } catch (error) {
        console.error('Erro na consulta:', error);
        res.status(500).json({ error: 'Erro na consulta' });
    }
});


module.exports = routerClientes;