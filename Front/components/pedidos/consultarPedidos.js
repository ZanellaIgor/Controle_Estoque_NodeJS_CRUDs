const baseUrl = "http://localhost:3002/";
const render = document.querySelector('.pedidos-render');
const table = document.createElement('table');
const trCabecalho= document.createElement('tr');
const tbody =document.createElement('tbody')
render.appendChild(table);

function insertTh(texto) {
    const th = document.createElement("th");
    th.innerText = texto;
    return th;
}

function criarCabecalho() {
    const th1 = insertTh('Número');
    const th2 = insertTh('Cliente');
    const th3 = insertTh('Valor');
    const th4 = insertTh('Data de Emissão');
    const th5 = insertTh('Cidade - Estado');
    const th6 = insertTh('Tipo');
    trCabecalho.appendChild(th1)
    trCabecalho.appendChild(th2)
    trCabecalho.appendChild(th3)
    trCabecalho.appendChild(th4)
    trCabecalho.appendChild(th5)
    trCabecalho.appendChild(th6)
    const thead = document.createElement('thead')
    thead.appendChild(trCabecalho)
    table.appendChild(thead)
}

async function consultarDocumentos(url) {
    const requisicao = url ? url : `${baseUrl}pedidos`
    console.log(requisicao)
    try {
        const request = await fetch(`${requisicao}`)
        const response = await request.json();
        const jsonPedidos = response.data;
        console.log(jsonPedidos)
        tbody.innerHTML='';
        table.innerHTML='';
        criarCabecalho();
        renderizarClientes(jsonPedidos);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

function renderizarClientes(jsonPedidos){
    jsonPedidos.map(pedido => {
        const numero = insertText(pedido.id);
        const cliente = insertText(pedido.cliente);
        const valor = insertText(pedido.valor_total);
        const dataEmissao = insertText(pedido.data_emissao);
        const cidade = insertText(`${pedido.cidade}-${pedido.estado}`);
        const tipo = insertText(pedido.tipo);
        const tr = document.createElement('tr');  
        tr.appendChild(numero);
        tr.appendChild(cliente);
        tr.appendChild(valor);
        tr.appendChild(dataEmissao);
        tr.appendChild(cidade);
        tr.appendChild(tipo);
        tbody.appendChild(tr)
        table.appendChild(tbody);
    });
    render.appendChild(table);
};

function insertText(texto) {
    const td = document.createElement("td");
    td.innerHTML = texto
    return td  
}
const filtrar = document.querySelector('.button-pesquisar')

filtrar.addEventListener("click", filtro = (e) => {
    e.preventDefault();
    const cliente = document.getElementById('cliente').value
    const dataIni = document.getElementById('dataIni').value
    const dataFin = document.getElementById('dataFin').value
    const url =  `${baseUrl}pedidos/search?cliente=${cliente}&dataIni=${dataIni}&dataFin=${dataFin}`;
    consultarDocumentos(url)
});

consultarDocumentos();
