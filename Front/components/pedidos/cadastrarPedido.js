const baseUrl = "http://localhost:3002/";

const error = document.getElementById('error');
const errorProduto =document.getElementById('errorProduto');
const searchInputClientes = document.getElementById('cliente');
const listaDeSugestoes = document.getElementById('sugestoes');
const listaDeSugestoesProdutos = document.getElementById('sugestoesProdutos');
const inputQuantidade = document.getElementById('quantidade');
const inputValorUnit = document.getElementById('valorUnit');
const inputValorTotal = document.getElementById('valorTotal');
const selectTipoPedido = document.getElementById('tipo').value;
let timeoutId;
let idSeq = 1;
let valorPedido=0;
const cliente = document.getElementById('cliente');
const tipoPedido = document.getElementById('tipo');
const messageError = document.getElementById('error')


document.addEventListener("DOMContentLoaded", function() {
    const data = new Date();
    data.setTime(data.getTime() - 180 * 60 * 1000);
    const dataFormatada = data.toISOString().split('T')[0];
    const dataEmissao = document.getElementById("dataEmissao");
    dataEmissao.value = dataFormatada;
});

searchInputClientes.addEventListener('input', function() {
    clearTimeout(timeoutId);
    timeoutId =setTimeout(function() {
        filterClientes();
    }, 3000);
});

async function filterClientes() {
    error.innerHTML='';
    listaDeSugestoes.innerHTML='';
    const nomeCliente = searchInputClientes.value;
    if(nomeCliente && nomeCliente.length <= 3) return error.innerHTML='Favor digitar ao menos 3 caracteres';
    try {
        const response = await fetch(`${baseUrl}clientes/search?nome=${nomeCliente}`);
        const clientes = await response.json();
        console.log("Dados da consulta:", clientes);
        sugestoesClientes(clientes.data);
    } catch (error) {
        console.error("Erro na consulta:");
    }
}

function sugestoesClientes(clientes) {
    console.log(clientes);
    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = cliente.nome;
        li.dataset.idCliente= cliente.id;
        listaDeSugestoes.appendChild(li);
        li.addEventListener('click', function() {
            searchInputClientes.value = cliente.nome;
            searchInputClientes.dataset.id= cliente.id;
            searchInputClientes.dataset.cidade=cliente.cidade;
            searchInputClientes.dataset.estado=cliente.estado;
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
    listaDeSugestoesProdutos.innerHTML = '';
    const produtoInput = searchInputProdutos.value;
    try {
      const response = await fetch(`${baseUrl}produtos/search?produto=${produtoInput}`)  
      const produtos = await response.json();
      sugestoesProdutos(produtos.data);
    } catch (error) {
        console.log(error);
    }
}

function sugestoesProdutos(produtos){
    console.log(produtos);
    listaDeSugestoesProdutos.innerHTML = '';
    if (errorProduto.innerHTML ) errorProduto.innerHTML='';
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = produto.nome;
        li.dataset.idProduto= produto.id;
        listaDeSugestoesProdutos.appendChild(li);
        li.addEventListener('click', function() {
            inputValorUnit.value= produto.valor;
            searchInputProdutos.value = produto.nome;
            searchInputProdutos.dataset.id= produto.id;
            searchInputProdutos.dataset.referencia= produto.referencia;
            listaDeSugestoesProdutos.innerHTML='';
            inputQuantidade.focus();
        });
    });
}

function insertProduto(event){
    event.preventDefault();
    if (searchInputProdutos.dataset.id == null || inputValorUnit.value == (null || 0) || inputQuantidade.value == (null || 0) ){
        return errorProduto.innerHTML='Verifique os valores informados';
    };
    const produtos = document.querySelector('.container-produtos');
    const produto = document.createElement('tr');
    produto.classList.add('container-produto');
    produto.dataset.seq=idSeq;
    produto.innerHTML = (`
    <td class="codigo" data-seq="${idSeq}">${searchInputProdutos.dataset.id}</td>
    <td class="descricao" >${searchInputProdutos.value}</td>
    <td class="referencia" >${searchInputProdutos.dataset.referencia}</td>
    <td class="quantidade" >${inputQuantidade.value}</td>
    <td class="valorUnit" >${inputValorUnit.value}</td>
    <td class="valorTotal" >${ inputValorUnit.value * inputQuantidade.value}</td>
    <td><button type="button" class="button-excluir" onclick="removerProduto(${idSeq})">Excluir</button></td>
    `);
    idSeq++;
    console.log(idSeq)
    produtos.appendChild(produto);
    valorTotalPedido();
    resetInput();
};

function removerProduto(id){
   const item = document.querySelector(`.container-produto[data-seq="${id}"]`);
   item.remove();
   valorTotalPedido();
}

function resetInput(){
    searchInputProdutos.value='';
    inputQuantidade.value='';
    inputValorUnit.value='';
}

function valorTotalPedido(){
    valorPedido=0
    const tdProdutos = Array.from(document.querySelectorAll('.container-produto'));
    tdProdutos.forEach(linha => {
        const celulas = linha.querySelectorAll('td');
        valorPedido += parseFloat(celulas[5].textContent);
    })
    inputValorTotal.value=valorPedido;
}

const buttonCadastrar = document.getElementById('buttonCadastrar');
buttonCadastrar.addEventListener('click', async function(){
    const listaDeProdutos = buscarDadosProdutos();
    const dadosPedido = buscarDadosPedido();
    await cadastrarPedido(listaDeProdutos,dadosPedido);
})

function buscarDadosProdutos() {
    const tdProdutos = Array.from(document.querySelectorAll('.container-produto'));
    const listaDeProdutos = [];
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
        listaDeProdutos.push(produto);
    });
    console.log(listaDeProdutos);
    return listaDeProdutos;
}

function buscarDadosPedido(){
    const dadosPedido = {
        idPessoa: searchInputClientes.dataset.id,
        cliente: searchInputClientes.value,
        cidade:searchInputClientes.dataset.cidade,
        estado:searchInputClientes.dataset.estado,
        tipo:selectTipoPedido,
        valorPedido,
    }
    return dadosPedido;
}

async function cadastrarPedido(listaDeProdutos,dadosPedido){
    console.log(listaDeProdutos)
    try {
        const cadastro = await fetch(`${baseUrl}pedidos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({listaDeProdutos, dadosPedido})
        });
        const response = await cadastro.json();
        console.log(response)
        if(response.error){
            return messageError.innerHTML=`${response.error}`
        }

    } catch (error) {
        console.error('Erro:');
    }
}