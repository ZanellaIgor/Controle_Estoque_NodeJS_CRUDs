const baseUrl = "http://localhost:3002/";

const error = document.getElementById('error');
const errorProduto =document.getElementById('errorProduto');
const searchInputClientes = document.getElementById('cliente');
const listaDeSugestoes = document.getElementById('sugestoes');
const listaDeSugestoesProdutos = document.getElementById('sugestoesProdutos');
const inputQuantidade = document.getElementById('quantidade');
const inputValorUnit = document.getElementById('valorUnit');
let timeoutId;


searchInputClientes.addEventListener('input', function() {
    clearTimeout(timeoutId);
    timeoutId =setTimeout(function() {
        filterClientes();
    }, 3000);
});

async function filterClientes() {
    error.innerHTML=''
    listaDeSugestoes.innerHTML=''
    const nomeCliente = searchInputClientes.value;
    if(nomeCliente && nomeCliente.length <= 3) return error.innerHTML='Favor digitar ao menos 3 caracteres';
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
    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = cliente.nome;
        li.dataset.idCliente= cliente.id;
        listaDeSugestoes.appendChild(li);
        li.addEventListener('click', function() {
            searchInputClientes.value = cliente.nome;
            searchInputClientes.dataset.id= cliente.id;
            listaDeSugestoes.innerHTML=''
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
    try {
      const response = await fetch(`${baseUrl}produtos/search?produto=${produtoInput}`)  
      const produtos = await response.json();
      sugestoesProdutos(produtos);
    } catch (error) {
        console.log(error);
    }
}

function sugestoesProdutos(produtos){
    listaDeSugestoesProdutos.innerHTML = '';
    if (errorProduto.innerHTML ) errorProduto.innerHTML='';
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
            listaDeSugestoesProdutos.innerHTML=''
            inputQuantidade.focus();
        });
    });
}

function insertProduto(event){
    event.preventDefault();
    if (searchInputProdutos.dataset.id == null || inputValorUnit.value == (null || 0) || inputQuantidade.value == (null || 0) ){
        return errorProduto.innerHTML='Verifique os valores informados'
    }
    const produtos = document.querySelector('.container-produtos');
    const produto = document.createElement('tr');
    produto.classList.add('container-produto');
    produto.innerHTML = (`
    <td class="codigo" >${searchInputProdutos.dataset.id}</td>
    <td class="descricao" >${searchInputProdutos.value}</td>
    <td class="referencia" >${searchInputProdutos.dataset.referencia}</td>
    <td class="quantidade" >${inputQuantidade.value}</td>
    <td class="valorUnit" >${inputValorUnit.value}</td>
    <td class="valorTotal" >${ inputValorUnit.value * inputQuantidade.value}</td>
    <td><button>Excluir</button></td>
    `);
    produtos.appendChild(produto);
    resetInput();
};

function resetInput(){
    searchInputProdutos.value='';
    inputQuantidade.value='';
    inputValorUnit.value='';
}

const buttonCadastrar = document.getElementById('buttonCadastrar')
buttonCadastrar.addEventListener('click', function(){
    buscarCampos();
})


function buscarCampos() {
    const tdProdutos = Array.from(document.querySelectorAll('.container-produto'));
    const listaDeCompras = [];
    tdProdutos.forEach((linha) => {
        const celulas = linha.querySelectorAll('td');
        const produto = {
            codigo: celulas[0].textContent,
            nome: celulas[1].textContent,
            referencia: celulas[2].textContent,
            quantidade: celulas[3].textContent,
            valorUnitario: celulas[4].textContent,
            valorTotal: celulas[5].textContent
        };
        listaDeCompras.push(produto);
    });
    console.log(listaDeCompras);
}

