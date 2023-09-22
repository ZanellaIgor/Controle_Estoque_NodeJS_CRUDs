const express = require('express');
const app = express();
const cors = require("cors");
const routerProdutos = require('./rotas/produtos');
const routerClientes = require('./rotas/clientes');
const routerDocumentos = require('./rotas/pedidos');
const porta = 3002

app.use(cors());
app.use(express.json())

app.use('/produtos', routerProdutos);
app.use('/clientes', routerClientes);
app.use('/pedidos', routerDocumentos);

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
