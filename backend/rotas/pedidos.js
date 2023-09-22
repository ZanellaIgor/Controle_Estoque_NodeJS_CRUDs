const express =require('express');
const routerDocumentos = express.Router();

const dbPedidos = [
    {"id":1, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":2530.55},
    {"id":2, "idPessoa":5, "tipo":"S", "cliente":"Roberval", "valorTotal":1580},
    {"id":3, "idPessoa":5, "tipo":"S", "Pedro":"Roberval", "valorTotal":800}
]

routerDocumentos.get('/', (req, res) =>{
    console.log('get')
    res.json(dbPedidos)
});

routerDocumentos.post('/', (req, res) =>{
    const {idPessoa, cliente,tipo, valorTotal} = req.body;
    console.log('cheguei')
    console.log(req.body)
    const novoPedido = {
        id: dbPedidos.length +1,
        idPessoa,
        cliente,
        valorTotal,
        tipo,
        dataEmissao: new Date().getDate(),
        horaEmissao: new Date().getHours()
    }
    res.status(201).json({
        statusCode:201,
        message: "Pedido criado com sucesso!"
    })
})



module.exports = routerDocumentos;