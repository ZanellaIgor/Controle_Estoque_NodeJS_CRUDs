const express = require('express');
const routerProdutos = express.Router();
const {pool}= require('../conexao/db');

// const dbProdutos = [
//     { "id": 1, "nome": "celula", "referencia": "Referencia", "estoque": 5, "valorUnit":5.5 },
//     { "id": 2, "nome": "Celular", "referencia": "Referencia2", "estoque": 10, "valorUnit": 1200 },
//     { "id": 3, "nome": "Produto", "referencia": "Referencia3", "estoque": 10, "valorUnit": 1300 },
//     { "id": 4, "nome": "Camera", "referencia": "105-fr", "estoque": 25, "valorUnit": 8500 },
//     { "id": 5, "nome": "Produto2", "referencia": "184-f", "estoque": 16, "valorUnit": 6589.45 },
// ];

routerProdutos.get('/', async function(req, res) {
    console.log('Estou aqui');
    try {
        
    } catch (error) {
        
    }
    res.json();
});

routerProdutos.post('/', async function(req, res) {
    const { nome, referencia, valor, estoque, imagem} = req.body;
    try {
        const insertQuery = `INSERT INTO produtos (nome, referencia, valor, estoque, imagem)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;`;

        const values = [nome, referencia, valor, estoque, imagem];
        const {rows} = await pool.query(insertQuery, values);
        const novoProdutoId = rows[0].id;

        res.status(201).json({
            statusCode: 201,
            message:"Produto criado com Sucesso",
            novoProdutoId,
        })

    } catch (error) {
        console.error('Erro ao cadastrar o produto no banco de dados:', error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao criar o produto.",
        });
    }

});

routerProdutos.get('/search', (req,res)=>{
    console.log(`${req.query.produto}`);
    const filtro = req.query.produto
    const searchProduto = filterProdutos(filtro);
    res.json(searchProduto);
});

function filterProdutos(filtro) {
    return dbProdutos.filter((produto) => {
      return produto.nome.toLowerCase().includes(filtro.toLowerCase());
    });
  }


module.exports = routerProdutos;
