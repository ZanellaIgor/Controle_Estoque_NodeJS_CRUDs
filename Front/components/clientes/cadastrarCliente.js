const buttonCep = document.getElementById('button-enviar cep');
buttonCep.addEventListener('click', (e)=>{
    e.preventDefault();
    const inputValue = document.getElementById('cep').value;
    const cep = inputValue.replace(/\D/g, '');
    consultaCep(cep);
})
const messageError = document.querySelector('.error');
async function consultaCep(cep){
    console.log(cep)
   const url = `https://viacep.com.br/ws/${cep}/json/` 
   try {
    const request = await fetch(`${url}`);
    const response = await request.json();
    preenchendoValores(response);
    
   } catch (error) {
    console.log(error)
   }
}

function preenchendoValores(endereco){
    console.log(endereco)
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');
    const rua = document.getElementById('rua');
    const bairro = document.getElementById('bairro');
    const complemento = document.getElementById('complemento')
    cidade.value=endereco.localidade;
    estado.value=endereco.uf;
    rua.value=endereco.logradouro;
    bairro.value=endereco.bairro;
    complemento.value=endereco.complemento;
}

const buttonCadastrar=document.querySelector('.button-enviar');
buttonCadastrar.addEventListener('click', (e)=>{
    e.preventDefault();
    messageError.innerHTML='';
    const clienteDadosPessoais = inputValoresCliente();
    const clienteEndereco = inputValoresEndereco();
    cadastrarCliente(clienteDadosPessoais, clienteEndereco);
});

function inputValoresEndereco(){
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const rua = document.getElementById('rua').value;
    const bairro = document.getElementById('bairro').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const clienteEndereco = {cep, cidade, estado, rua, bairro, numero, complemento}
    return clienteEndereco;
};

function inputValoresCliente(){
    const nome = document.getElementById('nome').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const cpfCnpj = document.getElementById('cpfCnpj').value;
    const ie = document.getElementById('ie').value;
    const email =document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const clienteDadosPessoais = {nome, tipo, cpfCnpj, ie, email, telefone}
    return clienteDadosPessoais;
};

async function cadastrarCliente(clienteDadosPessoais, clienteEndereco){
    const url = "http://localhost:3002/clientes";
    const clienteDados = {...clienteDadosPessoais, ...clienteEndereco}
    try {
        const request = await fetch(url, {method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(clienteDados)
    });
    const response = await request.json();
    if(response.error){
        return messageError.innerHTML=`${response.error}`
    }
    } catch (error) {
        console.log(error)
    }

};