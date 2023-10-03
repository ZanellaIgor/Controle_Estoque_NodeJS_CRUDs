const express = require('express');
const routerClientes = express.Router();
const {pool}= require('../conexao/db');


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

routerClientes.get('/search', (req, res) => {
    console.log(`${req.query.nome}`);
    const searchCliente = dbClientes.filter(cliente => cliente.nome.toLowerCase().includes(req.query.nome.toLowerCase()));
    res.json(searchCliente);
});

routerClientes.post('/', async(req, res) => {
    console.log(req.body)
    const { nome, tipo, cpfCnpj, ie, bairro, email, telefone, cep, cidade, estado, rua, numero, complemento } = req.body;
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

        const novaPessoa =[
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
        const {rows} = await pool.query(insertQuery, novaPessoa);
        const novaPessoaID = rows[0].id;
        res.status(201).json({
            statusCode: 201,
            message:"Cliente criado com Sucesso",
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


module.exports = routerClientes;