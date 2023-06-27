const api = "http://localhost:3001/api"



window.addEventListener("load", async function () {
    const formLogin = document.getElementById("form_login")
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault()

        const formData = new FormData(formLogin)
        const data = Object.fromEntries(formData.entries())
        console.log("data -> "+data.nome)
        console.log("data descrica -> "+data.descricao)
        console.log("data ingredientes-> "+data.ingredientes)
        console.log("data modo preparo -> "+data.modoPreparo)
        const dados = {nome : data.email, descricao: data.password , 
            ingredientes: data.ingredientes, modoPreparo : data.modoPreparo}
        console.log(dados)

        
        await addReceita(dados)
    })
}) 

async function addReceita(data) {
    return await axios.post("http://localhost:3001/api/cadastro_receita", {
        nome : data.email, descricao: data.password , 
        ingredientes: data.ingredientes, modoPreparo : data.modoPreparo
    }, {  headers:{
        token : `Bearer ${sessionStorage.getItem("jwt")}`
    }})
    
        .then((response) => {
            console.log(response.data.token)
            const token = response.data.token
            recarregar()
            
        })
        .catch((error) => {
            console.error("Erro ao salvar:", error)
            return null
        })
}

function recarregar() {
    window.location.reload()
}