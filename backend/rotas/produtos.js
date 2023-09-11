const express = require('express');
const routerProdutos = express.Router();

const dbProdutos = [
    { "id": 1, "nome": "celula", "referencia": "Referencia", "estoque": 5, "valorUnit":5.5 },
    { "id": 2, "nome": "Celular", "referencia": "Referencia2", "estoque": 10, "valorUnit": 1200 },
    { "id": 3, "nome": "Produto", "referencia": "Referencia3", "estoque": 10, "valorUnit": 1300 },
    { "id": 4, "nome": "Camera", "referencia": "105-fr", "estoque": 25, "valorUnit": 8500 },
    { "id": 5, "nome": "Produto2", "referencia": "184-f", "estoque": 16, "valorUnit": 6589.45 },
];

routerProdutos.get('/', function(request, response) {
    console.log('Estou aqui');
    response.json(dbProdutos);
});



routerProdutos.get('/search', (req,res)=>{
    console.log(`${req.query.produto}`);
    const searchProduto = dbProdutos.filter(produto => produto.nome.toLowerCase().includes(req.query.produto.toLowerCase()));
    res.json(searchProduto);
    console.log('searchProduto');
});



routerProdutos.post('/', (req, res) => {

    const { nome, valor, referencia, estoque, imagem } = req.body;

    const novoProduto = {
        id: produtos.length + 1, // Corrigido para usar produtos
        nome,
        valor,
        referencia,
        estoque,
        imagem,
        createdAt: new Date().toISOString(),
    };
    produtos.push(novoProduto);
    res.status(201).json({
        statusCode: 201,
        message: `Produto ${novoProduto.id} - ${novoProduto.nome} criado com sucesso!`
    });
});

module.exports = routerProdutos;
