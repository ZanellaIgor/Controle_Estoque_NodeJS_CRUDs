const express =require('express');
const routerDocumentos = express.Router();
const {pool}= require('./db');

const dbPedidos = [
    {"id":1, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":2530.55},
    {"id":2, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":1580},
    {"id":3, "idPessoa":5, "tipo":"S", "Pedro":"Roberval", "valorTotal":800}
]

routerDocumentos.get('/', (req, res) =>{
    console.log('get')
    res.json(dbPedidos)
});

routerDocumentos.post('/', async (req, res) =>{
    //const {idPessoa, cliente,tipo, valorTotal} = req.body;
    const {cliente, valorTotal} = req.body

    try {
        const insertQuery = `
        INSERT INTO documentos (nomeCliente, valorTotal)
        VALUES ($1, $2)
        RETURNING id;`;

        const values = [cliente, valorTotal];

        const { rows } = await pool.query(insertQuery, values);

        const novoPedidoId = rows[0].id;

        res.status(201).json({
            statusCode: 201,
            message: "Pedido criado com sucesso!",
            novoPedidoId,
        });
    } catch (error) {
        console.error('Erro ao inserir pedido no banco de dados:', error);
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao criar o pedido.",
        });
    }
});
    // const novoPedido = {
    //     id: dbPedidos.length +1,
    //     idPessoa,
    //     cliente,
    //     valorTotal,
    //     tipo,
    //     dataEmissao: new Date().getDate(),
    //     horaEmissao: new Date().getHours()
    // }

    // res.status(201).json({
    //     statusCode:201,
    //     message: "Pedido criado com sucesso!"
    // })




module.exports = routerDocumentos;