//import { Produto } from "../../modules/classes/produto";
const produtos = [
    { "id": 1, "nome": "celula", "valor":5, "referencia": "Referencia", "estoque": 5, "unidade": "UN" },
    { "id": 2, "nome": "Celular", "valor":5, "referencia": "Referencia2", "estoque": 10, "unidade": "CD" },
    { "id": 3, "nome": "Produto", "valor":5, "referencia": "Referencia3", "estoque": 10, "unidade": "CX" },
    { "id": 4, "nome": "Camera",  "valor":5,"referencia": "105-fr", "estoque": 25, "unidade": "UN" },
    { "id": 5, "nome": "Produto2", "valor":5, "referencia": "184-f", "estoque": 16, "unidade": "UND" },
];

const table = document.createElement("table")

//cabeçalho da tabela
function insertTh(texto) {
    const th = document.createElement("th")
    th.innerText = texto
    return table.appendChild(th)
}

//Em breve no CRUD para deletar
function deletarProduto(produto){
   alert(`Estou deletando o produto ${produto}`)
}

const th1 = insertTh('Código');
const th2 = insertTh('Nome');
const th3 = insertTh('Valor');
const th4 = insertTh('Refêrencia');
const th5 = insertTh('Quantidade');


function insertText(texto) {
    const td = document.createElement("td");
    td.innerHTML = texto
    return td
}

//Função para renderização;
produtos.map(produto => {
    const render = document.querySelector('.produto-render');
    const codigo = insertText(produto.id);
    const nome = insertText(produto.nome);
    const valor = insertText(produto.valor)
    const referencia = insertText(produto.referencia);
    const quantidade = insertText(`${produto.estoque} ${produto.unidade}`);
    const tr = document.createElement('tr');
    const buttonExcluir = insertText(`
    <button class="button-limpar" onclick="deletarProduto(${produto.id})">Excluir<button/> 
    <button class="button-editar"><a href="./editarProduto.html">Editar<a><button/>`)

    
    tr.appendChild(codigo);
    tr.appendChild(nome);
    tr.appendChild(valor);
    tr.appendChild(referencia);
    tr.appendChild(quantidade);
    tr.appendChild(buttonExcluir);

    table.appendChild(tr);
    render.appendChild(table);
});


const filtrar = document.querySelector('.button-enviar')

filtrar.addEventListener("click", filtro = (e) => {
    e.preventDefault();
    const inputCodigo = document.getElementById('codigo').value
    const inputNome = document.getElementById('nome').value
    const inputReferencia = document.getElementById('referencia').value
    const pr = [...produtos]
    const produtosFiltrados = pr.filter((produto) => {
        if (inputCodigo && !produto.id == inputCodigo) {
            return false;
        }
        if (inputNome && !produto.nome.toLowerCase().includes(inputNome.toLowerCase())) {
            return false;
        }
        if (inputReferencia && !produto.referencia.toLowerCase().includes(inputReferencia.toLowerCase())) {
            return false;
        }
        return true;
    })
    console.log(produtosFiltrados) 
});
