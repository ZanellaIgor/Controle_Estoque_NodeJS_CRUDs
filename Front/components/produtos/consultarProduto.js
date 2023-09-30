const baseUrl = "http://localhost:3002/";
const render = document.querySelector('.produto-render');
const table = document.createElement("table");

function insertTh(texto) {
    const th = document.createElement("th");
    th.innerText = texto;
    return table.appendChild(th);
}


function criarCabecalho() {
    const th1 = insertTh('Código');
    const th2 = insertTh('Nome');
    const th3 = insertTh('Valor');
    const th4 = insertTh('Refêrencia');
    const th5 = insertTh('Estoque');
}
function insertText(texto) {
    const td = document.createElement("td");
    td.innerHTML = texto
    return td  
}

async function consultarProdutos(url) {
    const requisicao = url ? url : `${baseUrl}produtos`
    console.log(requisicao)
    try {
        const request = await fetch(`${requisicao}`)
        const response = await request.json();
        const jsonProutos = response.data;
        table.innerText='';
        criarCabecalho();
        renderizarProdutos(jsonProutos);
        console.log(response);
    } catch (error) {
        console.error('Erro:');
    }
}

function renderizarProdutos(jsonProutos){
    jsonProutos.map(produto => {
        const codigo = insertText(produto.id);
        const nome = insertText(produto.nome);
        const valor = insertText(produto.valor)
        const referencia = insertText(produto.referencia);
        const estoque = insertText(produto.estoque);
        const tr = document.createElement('tr');
        const buttonExcluir = insertText(`
        <button class="button-limpar" onclick="deletarProduto(${produto.id})">Excluir<button/> 
        <button class="button-editar"><a href="./editarProduto.html">Editar<a><button/>`)
        
        tr.appendChild(codigo);
        tr.appendChild(nome);
        tr.appendChild(valor);
        tr.appendChild(referencia);
        tr.appendChild(estoque);
        tr.appendChild(buttonExcluir);
        table.appendChild(tr);
        
    });
    render.appendChild(table);
};


const filtrar = document.querySelector('.button-enviar')

filtrar.addEventListener("click", filtro = (e) => {
    e.preventDefault();
    const codigo = document.getElementById('codigo').value
    const nome = document.getElementById('nome').value
    const referencia = document.getElementById('referencia').value
    const url =  `${baseUrl}produtos/search?codigo=${codigo}&nome=${nome}&referencia=${referencia}`;
    consultarProdutos(url)
    // const pr = [...produtos]
    // const produtosFiltrados = pr.filter((produto) => {
    //     if (inputCodigo && !produto.id == inputCodigo) {
    //         return false;
    //     }
    //     if (inputNome && !produto.nome.toLowerCase().includes(inputNome.toLowerCase())) {
    //         return false;
    //     }
    //     if (inputReferencia && !produto.referencia.toLowerCase().includes(inputReferencia.toLowerCase())) {
    //         return false;
    //     }
    //     return true;
    // })
    // console.log(produtosFiltrados) 
});

async function deletarProduto(produto) {
    if (confirm('Tem certeza que deseja deletar este Produto?')) {
        try {
            console.log(baseUrl, produto)
            const response = await fetch(`${baseUrl}produtos/${produto}`, { method: 'DELETE' })
            console.log(response.message);
            consultarProdutos();
        } catch (error) {
            console.log('Ocorreu um erro:', error)
        }
    }
}

consultarProdutos();