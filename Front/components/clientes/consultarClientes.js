const baseUrl = "http://localhost:3002/";
const render = document.querySelector('.clientes-render');
const table = document.createElement("table");
const trCabecalho =document.createElement('tr');

function insertTh(texto) {
    const th = document.createElement("th");
    th.innerText = texto;
    return th;
}

function criarCabecalho() {
    
    const th1 = insertTh('Código');
    const th2 = insertTh('Nome');
    const th3 = insertTh('Cidade');
    const th4 = insertTh('Estado');
    const th5 = insertTh('Tipo');
    trCabecalho.appendChild(th1)
    trCabecalho.appendChild(th2)
    trCabecalho.appendChild(th3)
    trCabecalho.appendChild(th4)
    trCabecalho.appendChild(th5)
    table.appendChild(trCabecalho)
}
function insertText(texto) {
    const td = document.createElement("td");
    td.innerHTML = texto
    return td  
}

async function consultarClientes(url) {
    const requisicao = url ? url : `${baseUrl}clientes`
    console.log(requisicao)
    table.innerHTML='';
    trCabecalho.innerHTML=''
    try {
        const request = await fetch(`${requisicao}`)
        const response = await request.json();
        const jsonClientes = response.data;
        console.log(table)
        criarCabecalho();
        renderizarClientes(jsonClientes);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

function renderizarClientes(jsonClientes){
    jsonClientes.map(cliente => {
        const codigo = insertText(cliente.id);
        const nome = insertText(cliente.nome);
        const cidade = insertText(cliente.cidade);
        const estado = insertText(cliente.estado);
        const tipo = insertText(cliente.tipo);
        
        const tr = document.createElement('tr');
        const buttonExcluir = insertText(`
        <button class="button-limpar" onclick="deletarProduto(${cliente.id})">Excluir</button> 
        <button class="button-editar"><a href="./editarCliente.html">Editar</a></button>`)
        
        tr.appendChild(codigo);
        tr.appendChild(nome);
        tr.appendChild(cidade);
        tr.appendChild(estado);
        tr.appendChild(tipo);
        tr.appendChild(buttonExcluir);
        table.appendChild(tr);
        
    });
    render.appendChild(table);
};

const filtrar = document.querySelector('.button-consultar');
filtrar.addEventListener('click', (e)=>{
    e.preventDefault();
    const cliente = document.getElementById('nome').value;
    const cidade = document. getElementById('cidade').value;
    const url = `${baseUrl}clientes/search?nome=${cliente}&cidade=${cidade}`;
    consultarClientes(url);
})

async function deletarProduto(cliente) {
    if (confirm('Tem certeza que deseja deletar este Cliente?')) {
        try {
            console.log(baseUrl, cliente)
            const response = await fetch(`${baseUrl}clientes/${cliente}`, { method: 'DELETE' })
            console.log(response.message);
            consultarClientes();
        } catch (error) {
            console.log('Ocorreu um erro:', error)
        }
    }
}

consultarClientes();