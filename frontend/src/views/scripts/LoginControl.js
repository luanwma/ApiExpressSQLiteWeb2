//require('dotenv').config()
const api = "http://localhost:3001/api"



window.addEventListener("load", async function () {
    const formLogin = document.getElementById("form_login")
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault()

        const formData = new FormData(formLogin)
        const data = Object.fromEntries(formData.entries())
        console.log("data -> "+data.email)
        console.log("data email -> "+data.email)
        const dados = {email : data.email, password: data.password}
        console.log(dados)

        
        await dadosUser(dados)
    })
}) 

async function dadosUser(data) {
    return await axios.post("http://localhost:3001/api/login", {
    email:data.email, 
    password: data.password
    })
    
        .then((response) => {
            console.log(response.data.token)
            const token = response.data.token
            if (token) {
                login(data)
                return true
            }
            return false
        })
        .catch((error) => {
            console.error("Error:", error)
            return null
        })
}

function login(data) {
    console.log("logado")
    sessionStorage.setItem("jwt", data.token)
    sessionStorage.setItem("userid", data.userid)
}

function recarregarPagina() {
    window.location.reload()
}

