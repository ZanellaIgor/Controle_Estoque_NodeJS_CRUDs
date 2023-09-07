
function pesquisarCliente(event){
    event.preventDefault();
    const codCliente = document.getElementById('codCliente').value
    const nomeCliente = document.getElementById('cliente').value
    const selectCliente = document.getElementById('render')
    const option = document.createElement('option')
    option.value='testando'
    option.innerText='testando2'
    selectCliente.appendChild(option)
};

function insertProduto(event){
    event.preventDefault();
    const produtos = document.querySelector('.container-produtos')
    const produto = document.createElement('tr')
    produto.classList.add('container-produto')
    produto.innerHTML = (`
    <td><input type="number" name="codigo" id="codigo-" placeholder="Codigo do produto"></td>
    <td><input type="text" name="nome" id="nome" placeholder="Nome do produt<td>o"></td>
    <td><input type="text" name="referencia" id="referencia" placeholder="Referência do produto"></td>
    <td><input type="number" name="quantidade" id="quantidade" placeholder="Quantidade"></td>
    <td><input type="number" name="valor" id="valor" placeholder="Valor unitario"></td>
    <td><input type="number" name="valorTotal" id="valorTotal" placeholder="Valor Total" readonly></td>
    <td><button>Excluir</button></td>
    `)
    
    produtos.appendChild(produto)
};

