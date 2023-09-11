const baseUrl = "http://localhost:3002/"

const error = document.getElementById('error');
const searchInputClientes = document.getElementById('cliente');
const listaDeSugestoes = document.getElementById('sugestoes');
const listaDeSugestoesProdutos = document.getElementById('sugestoesProdutos');
const inputQuantidade = document.getElementById('quantidade')
const inputValorUnit = document.getElementById('valorUnit')
let timeoutId;


searchInputClientes.addEventListener('input', function() {
    clearTimeout(timeoutId);
    timeoutId =setTimeout(function() {
        filterClientes();
    }, 3000);
});

async function filterClientes() {
    error.innerHTML=''
    const nomeCliente = searchInputClientes.value;
    if(nomeCliente && nomeCliente.length <= 3) return error.innerHTML='Favor digitar ao menos 3 caracteres'
    try {
        const response = await fetch(`${baseUrl}clientes/search?nome=${nomeCliente}`);
        const clientes = await response.json();
        console.log("Dados da consulta:", clientes);
        sugestoesClientes(clientes);
    } catch (error) {
        console.error("Erro na consulta:");
    }
}


function sugestoesClientes(clientes) {
    // Cria e exibe as sugestões
    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = cliente.nome;
        li.dataset.idCliente= cliente.id;
        listaDeSugestoes.appendChild(li);
        li.addEventListener('click', function() {
            searchInputClientes.value = cliente.nome;
            searchInputClientes.dataset.id= cliente.id;
        });
    });
}

const searchInputProdutos = document.getElementById('produto');

searchInputProdutos.addEventListener('input',()=>{
    clearTimeout(timeoutId);
    timeoutId =setTimeout(function() {
        filtrarProdutos();
    }, 3000);
})

async function filtrarProdutos(){
    listaDeSugestoesProdutos.innerHTML = ''
    const produtoInput = searchInputProdutos.value;
    console.log(produtoInput)
    try {
      const response = await fetch(`${baseUrl}produtos/search?produto=${produtoInput}`)  
      const produtos = await response.json();
      sugestoesProdutos(produtos)
    } catch (error) {
        console.log(error)
    }
}

function sugestoesProdutos(produtos){
    listaDeSugestoesProdutos.innerHTML = '';
    console.log(produtos)
    // Cria e exibe as sugestões
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = produto.nome;
        li.dataset.idProduto= produto.id;
        listaDeSugestoesProdutos.appendChild(li);

        li.addEventListener('click', function() {
            inputValorUnit.value= produto.valorUnit;
            searchInputProdutos.value = produto.nome;
            searchInputProdutos.dataset.id= produto.id;
            searchInputProdutos.dataset.referencia= produto.referencia;
            inputQuantidade.focus();
        });
    });
}

function insertProduto(event){
    event.preventDefault();
    const produtos = document.querySelector('.container-produtos');
    const produto = document.createElement('tr');
    produto.classList.add('container-produto');
    produto.innerHTML = (`
    <td><input type="number" name="codigo" id="codigo-" value="${searchInputProdutos.dataset.id}"></td>
    <td><input type="text" name="nome" id="nome" value="${searchInputProdutos.value}"></td>
    <td><input type="text" name="referencia" id="referencia" value="${searchInputProdutos.dataset.referencia}"></td>
    <td><input type="number" name="quantidade" id="quantidade" value="${inputQuantidade.value}"></td>
    <td><input type="number" name="valor" id="valor" value="${inputValorUnit.value}"></td>
    <td><input type="number" name="valorTotal" id="valorTotal" value="${ inputValorUnit.value * inputQuantidade.value}" readonly></td>
    <td><button>Excluir</button></td>
    `)
    produtos.appendChild(produto)
};

