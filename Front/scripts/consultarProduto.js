//import { Produto } from "../../modules/classes/produto";
const produtos = [
    { "id": 1, "nome": "celula", "referencia": "Referencia", "estoque": 5, "unidade": "UN" },
    { "id": 2, "nome": "Celular", "referencia": "Referencia2", "estoque": 10, "unidade": "CD" },
    { "id": 3, "nome": "Produto", "referencia": "Referencia3", "estoque": 10, "unidade": "CX" },
    { "id": 4, "nome": "Camera", "referencia": "105-fr", "estoque": 25, "unidade": "UN" },
    { "id": 5, "nome": "Produto2", "referencia": "184-f", "estoque": 16, "unidade": "UND" },
];

const table = document.createElement("table")

function insertTh(texto) {
    const th = document.createElement("th")
    th.innerText = texto
    console.log(th)
    return table.appendChild(th)
}

const th1 = insertTh('Código');
const th2 = insertTh('Nome');
const th3 = insertTh('Refêrencia');
const th4 = insertTh('Quantidade');


function insertText(texto) {
    const td = document.createElement("td");
    td.innerHTML = texto
    return td
}

produtos.map(produto => {
    const render = document.querySelector('.produto-render');
    const codigo = insertText(produto.id);
    const nome = insertText(produto.nome);
    const referencia = insertText(produto.referencia);
    const quantidade = insertText(`${produto.estoque} ${produto.unidade}`);
    const tr = document.createElement('tr');

    tr.appendChild(codigo);
    tr.appendChild(nome);
    tr.appendChild(referencia);
    tr.appendChild(quantidade);

    table.appendChild(tr);
    render.appendChild(table);
});

const inputCodigo = document.getElementById('codigo')
const inputNome = document.getElementById('nome')
const inputReferencia = document.getElementById('referencia')

// produtos.forEach(produto => {
//     const container = document.querySelector('.produto-render');

//     const row = document.createElement("tr"); // Criar uma nova linha para cada produto

//     const nomeCell = insertText(produto.nome);
//     const referenciaCell = insertText(produto.referencia);
//     const estoqueCell = insertText(produto.estoque);

//     row.appendChild(nomeCell);
//     row.appendChild(referenciaCell);
//     row.appendChild(estoqueCell);

//     table.appendChild(row);
//     container.appendChild(table);
// });