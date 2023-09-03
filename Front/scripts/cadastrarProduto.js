
function inputValores(){
const nome = document.getElementById('nome').value
const referencia = document.getElementById('referencia').value
const estoque = document.getElementById('estoque').value
const unidade = document.getElementById('unidade').value
const imagem = document.getElementById('imagem').value

const produto = {
    nome,
    referencia,
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