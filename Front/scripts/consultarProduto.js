//import { Produto } from "../../modules/classes/produto";
const produtos = [
    {"id":1,"nome":"celula","referencia":"Referencia","estoque":5, "unidade":"UN"},
    {"id":2, "nome":"karla","referencia":"Referencia2","estoque":10, "unidade":"CD" },
];

const table = document.createElement("table")
const th = document.createElement("th")



function insertText(texto){
    const td = document.createElement("td");
    td.innerHTML=texto
    return td
}

produtos.map(produto => {
    const render = document.querySelector('.produto-render');
    const nome = insertText(produto.nome);
    const referencia = insertText(produto.referencia);
    const quantidade =insertText(`${produto.estoque} ${produto.unidade}`);
    const tr =document.createElement('tr');
    
    console.log(render);
    tr.appendChild(nome);
    tr.appendChild(referencia);
    tr.appendChild(quantidade);

    
    table.appendChild(tr);
    console.log(render)
    render.appendChild(table);
});

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