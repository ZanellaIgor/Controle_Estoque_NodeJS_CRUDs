const form = document.querySelector('#form')
const login = []
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value
    
    console.log(email)
})