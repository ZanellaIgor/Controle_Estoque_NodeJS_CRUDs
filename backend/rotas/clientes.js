const express = require('express');
const routerClientes = express.Router();

const dbClientes = [
    { "id": 1, "nome":"Roberval", "cidade":"Tupanci do Sul", "estado": "RS" },
    { "id": 2, "nome":"Gary", "cidade":"Caxias do Sul", "estado": "RS" },
    { "id": 3, "nome":"Bob Esponja", "cidade":"Sonza", "estado": "RS" },
    { "id": 4, "nome":"Roberto", "cidade":"São Paulo", "estado": "SP" }
];

routerClientes.get('/', (req,res)=>{
    res.json(dbClientes);
    console.log('clientes');
});

routerClientes.get('/search', (req,res)=>{
    console.log(`${req.query.nome}`);
    const searchCliente = dbClientes.filter(cliente => cliente.nome.toLowerCase().includes(req.query.nome.toLowerCase()));
    res.json(searchCliente);
});

routerClientes.post('/', (req, res) => {
    
    const { nome, tipo, cpfCnpj, ie, email, telefone, cep, cidade, estado, rua, numero, complemento } = req.body;

    const novoCliente = {
        nome,
        tipo,
        cpfCnpj,
        ie,
        email,
        telefone,
        cep, cidade,
        estado,
        rua,
        numero,
        complemento,
        createdAt: new Date().toISOString(),
    };
    produtos.push(novoProduto);
    res.status(201).json({
        statusCode: 201,
        message: `Produto ${novoCliente.id} - ${novoCliente.nome} criado com sucesso!`
    });
});


module.exports = routerClientes;