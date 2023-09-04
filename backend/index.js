const express = require("express")
const cors = require("cors");

const app = express();

const produtos = [
    { "id": 1, "nome": "celula", "referencia": "Referencia", "estoque": 5, "unidade": "UN" },
    { "id": 2, "nome": "Celular", "referencia": "Referencia2", "estoque": 10, "unidade": "CD" },
    { "id": 3, "nome": "Produto", "referencia": "Referencia3", "estoque": 10, "unidade": "CX" },
    { "id": 4, "nome": "Camera", "referencia": "105-fr", "estoque": 25, "unidade": "UN" },
    { "id": 5, "nome": "Produto2", "referencia": "184-f", "estoque": 16, "unidade": "UND" },
];

app.use(cors());
app.use(express.json())


app.get('/produtos', function(request, response){

    response.json(produtos)
});

app.listen(3005, () => console.log('servidor rodando'))