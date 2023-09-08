const baseUrl = "http://localhost:3002/clientes"
const error = document.getElementById('error')

async function pesquisarClientes(event) {
    event.preventDefault();
    error.innerHTML="";
    const codCliente = document.getElementById('codCliente').value
    const nomeCliente = document.getElementById('cliente').value
    console.log(nomeCliente)
    if(nomeCliente.length >= 3 ){
        console.log(`${nomeCliente.length}`)
    try {
        const response = await fetch(`${baseUrl}/search?nome=${nomeCliente}`);
        const clientes = await response.json();
        console.log("Dados da consulta:", clientes);
        return procuraClientes(clientes)
    } catch (error) {
        console.error("Erro na consulta:");
    } }
    else {
        error.innerHTML='Minimo 3 caracteres'
    }
};
    
function procuraClientes(clientes){
    console.log(clientes)
    const selectCliente = document.getElementById('render');
    limparOptions();
    clientes.forEach(cliente => {
        const option = document.createElement('option')
        option.value=cliente.id
        option.innerText=cliente.nome
        selectCliente.appendChild(option)
        
    });
    selectCliente.addEventListener("change",clienteSelecionado)
}

function limparOptions(){
    const selectCliente = document.getElementById('render');
    selectCliente.innerHTML=''
}

function clienteSelecionado(){
    const selectCliente = document.getElementById('render');
    const selectedValue = selectCliente.value;
    const selectedIndex = selectCliente.selectedIndex;
    const selectedOption = selectCliente.options[selectedIndex];
    const selectedText = selectedOption.textContent;
    console.log(selectedValue,selectedText)
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

