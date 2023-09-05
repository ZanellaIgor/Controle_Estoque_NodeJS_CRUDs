const express = require('express');
const app = express();
const cors = require("cors");
const produtosRoutes = require('./rotas/produtos'); // Importe os roteadores corretamente

const porta = 3002

app.use(cors());
app.use(express.json())

app.use('/produtos', produtosRoutes); // Use produtosRoutes, não router

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
