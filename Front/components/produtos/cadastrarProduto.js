const baseUrl = "http://localhost:3002/";

const buttonEnviar = document.querySelector('.button-enviar')
buttonEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const novoProduto = inputValores();
    cadastrarPedido(novoProduto);
})

function inputValores() {
    const nome = document.getElementById('nome').value
    const referencia = document.getElementById('referencia').value
    const estoque = parseFloat(document.getElementById('estoque').value)
    const imagem = document.getElementById('imagem').value
    const valor = parseFloat(document.getElementById('valor').value)
    const novoProduto = {
        nome,
        referencia,
        valor,
        estoque,
        imagem
    }
    return novoProduto
} 

async function cadastrarPedido(novoProduto) {
    try {
        const request = await fetch(`${baseUrl}produtos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(novoProduto)
        });
        const response = await request.json();
        console.log(response);
        alert(`${response.message} com codigo ${response.novoProdutoId}`);
        location.reload(true);
    } catch (error) {
        console.error('Erro:');
    }
}

