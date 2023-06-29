const api = "http://localhost:3001/api"

window.addEventListener("load", async function(){
    const formCategoria = document.getElementById("form_cad_categoria")
    
    formCategoria.addEventListener("submit", async (event) =>{
        event.preventDefault()
        
        const formData = new FormData(formCategoria)
        const data = Object.fromEntries(formData.entries())
        console.log("data nome cat -> "+data.nomecategoria)
        console.log("data descricao cat -> "+data.descricao)
        const dados = {nome : data.nomecategoria, descricao : data.descricao}
        await addCategoria(dados)

    })
})


async function addCategoria(dados){
    return await axios.post("http://localhost:3001/api/cadastro_categoria", {
        nomeCategoria: dados.nome, descricao: dados.descricao
    }, {
        headers: {
            token : `${sessionStorage.getItem("jwt")}`,
            userid : `${sessionStorage.getItem("userid")}`

        }
        
    }).then((response) =>{
        console.log("token cliente ->"+response.data.token)
        const token = response.data.token
    }).catch( (error) =>{
        console.error("erro ao salvar categoria -> "+error)
        return null
    })
}