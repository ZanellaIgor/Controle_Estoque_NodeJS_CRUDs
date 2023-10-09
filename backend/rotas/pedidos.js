const express =require('express');
const routerDocumentos = express.Router();
const {pool}= require('../conexao/db');

const dbPedidos = [
    {"id":1, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":2530.55},
    {"id":2, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":1580},
    {"id":3, "idPessoa":5, "tipo":"S", "Pedro":"Roberval", "valorTotal":800}
]

routerDocumentos.get('/', (req, res) =>{
    console.log('get');
    res.json(dbPedidos);
});

routerDocumentos.post('/', async (req, res) =>{
    const {listaDeProdutos, dadosPedido} = req.body
    console.log(req.body)
    try {
        const insertQuery = `
        INSERT INTO documentos (IDPESSOA, VALORTOTAL, TIPO)
        VALUES ($1, $2, $3)
        RETURNING id;`;

        const values = [dadosPedido.idPessoa, dadosPedido.valorPedido, dadosPedido.tipo];


        const { rows } = await pool.query(insertQuery, values);
        console.log('aqui')
        const novoPedidoId = rows[0].id;

        res.status(201).json({
            statusCode: 201,
            message: "Pedido criado com Sucesso!",
            novoPedidoId,
        });
    } catch (error) {
        console.error('Erro ao cadastrar o pedido no banco de dados:', error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao criar o pedido.",
        });
    }
});

module.exports = routerDocumentos;