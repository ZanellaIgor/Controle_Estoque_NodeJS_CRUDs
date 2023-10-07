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
       pessoas.innerHTML+=`Total de Clientes ${response.rows}`
       
    } catch (error) {
        console.log(error);
    }
};
dashboardHome()