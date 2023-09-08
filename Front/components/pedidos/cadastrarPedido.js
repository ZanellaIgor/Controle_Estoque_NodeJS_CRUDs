const baseUrl = "http://localhost:3002/clientes"

const error = document.getElementById('error');
//
const searchInput = document.getElementById('cliente');
const listaDeSugestoes = document.getElementById('sugestoes');
let timeoutId;



searchInput.addEventListener('input', function() {
    clearTimeout(timeoutId); // Limpa o timeout anterior se houver
    timeoutId =setTimeout(function() {
        filterClientes();
    }, 3000);
});
async function filterClientes() {
    listaDeSugestoes.innerHTML = ''
    error.innerHTML=''
    const nomeCliente = searchInput.value;
    if(nomeCliente && nomeCliente.length <= 3) return error.innerHTML='Favor digitar ao menos 3 caracteres'
    try {
        const response = await fetch(`${baseUrl}/search?nome=${nomeCliente}`);
        const clientes = await response.json();
        console.log("Dados da consulta:", clientes);
        sugestoesClientes(clientes);
    } catch (error) {
        console.error("Erro na consulta:");
    }
}


function sugestoesClientes(clientes) {
    // Limpa a lista de sugestões
    listaDeSugestoes.innerHTML = '';

    // Cria e exibe as sugestões
    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = cliente.nome;
        li.dataset.idCliente= cliente.id;
        listaDeSugestoes.appendChild(li);

        li.addEventListener('click', function() {
            // Quando o usuário clica em uma sugestão, preenchemos o campo de pesquisa com a sugestão
            searchInput.value = cliente.nome;
            searchInput.dataset.id= cliente.id;
            // Limpa a lista de sugestões
            listaDeSugestoes.innerHTML = '';
        });
    });
}


function insertProduto(event){
    event.preventDefault();
    const produtos = document.querySelector('.container-produtos')
    const produto = document.createElement('tr')
    produto.classList.add('container-produto')
    produto.innerHTML = (`
    <td><input type="number" name="codigo" id="codigo-" placeholder="Codigo do produto"></td>
    <td><input type="text" name="nome" id="nome" placeholder="Nome do produto"></td>
    <td><input type="text" name="referencia" id="referencia" placeholder="Referência do produto"></td>
    <td><input type="number" name="quantidade" id="quantidade" placeholder="Quantidade"></td>
    <td><input type="number" name="valor" id="valor" placeholder="Valor unitario"></td>
    <td><input type="number" name="valorTotal" id="valorTotal" placeholder="Valor Total" readonly></td>
    <td><button>Excluir</button></td>
    `)
    produtos.appendChild(produto)
};

