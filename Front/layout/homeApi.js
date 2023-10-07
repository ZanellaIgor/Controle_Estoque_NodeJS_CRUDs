const baseUrl = "http://localhost:3002/";
const pessoas = document.querySelector('.pessoas');
const produtos = document.querySelector('.produtos');
const documentos = document.querySelector('documentos')
console.log(pessoas)
function dashboardHome(){
    renderizarDashboardClientes();
}

async function renderizarDashboardClientes(){
    try {
       const request = await fetch(`${baseUrl}clientes/contagem`);
       const response = await request.json();
       console.log(response);
       pessoas.innerHTML=`Total de Clientes ${response.count}`
    } catch (error) {
        console.log(error);
    }
    try {
       const request = await fetch(`${baseUrl}clientes/cidades`);
       const response = await request.json();
       console.log(response);
       const  cliente = response.rows
       const cidades = document.createElement('div');
       
       
       for (let i in cliente){
        const numero =document.createElement('p');
        numero.innerHTML+=`Total de Clientes em ${cliente[i].cidade} são ${cliente[i].count} `
        cidades.appendChild(numero)
        pessoas.appendChild(cidades)
       }
       
    } catch (error) {
        console.log(error);
    }
};
function insertElementos(conteudo){

}

dashboardHome()