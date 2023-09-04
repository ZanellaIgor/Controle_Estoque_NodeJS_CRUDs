
function inputValores(){
const nome = document.getElementById('nome').value
const referencia = document.getElementById('referencia').value
const estoque = parseFloat(document.getElementById('estoque').value)
const unidade = document.getElementById('unidade').value
const imagem = document.getElementById('imagem').value
const valor = parseFloat(document.getElementById('valor').value)

const produto = {
    nome,
    referencia,
    valor,
    estoque,
    unidade,
    imagem
}
console.log(produto)
}

const buttonEnviar =  document.querySelector('.button-enviar')
buttonEnviar.addEventListener('click', (e)=>{
    e.preventDefault()
    inputValores() 
})