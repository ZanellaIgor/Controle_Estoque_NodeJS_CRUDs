const express = require('express');
const routerProdutos = express.Router();

const produtos = [
    { "id": 1, "nome": "celula", "referencia": "Referencia", "estoque": 5, "unidade": "UN" },
    { "id": 2, "nome": "Celular", "referencia": "Referencia2", "estoque": 10, "unidade": "CD" },
    { "id": 3, "nome": "Produto", "referencia": "Referencia3", "estoque": 10, "unidade": "CX" },
    { "id": 4, "nome": "Camera", "referencia": "105-fr", "estoque": 25, "unidade": "UN" },
    { "id": 5, "nome": "Produto2", "referencia": "184-f", "estoque": 16, "unidade": "UND" },
];

routerProdutos.get('/', function(request, response) {
    console.log('Estou aqui');
    response.json(produtos);
});

routerProdutos.get('/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
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
