const express = require('express');
const app = express();
const cors = require("cors");
const routerProdutos = require('./rotas/produtos'); // Importe os roteadores corretamente
const routerClientes = require('./rotas/clientes')
const porta = 3002

app.use(cors());
app.use(express.json())

app.use('/produtos', routerProdutos);
app.use('/clientes', routerClientes);

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
