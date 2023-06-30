const api = "http://localhost:3001/api"


var listaReceitas = []

window.addEventListener("load", async function () {
    try {
        const res = await axios.get("http://localhost:3001/api/minhas_receitas", {
            headers :{
                token : sessionStorage.getItem("jwt"),
                userid : sessionStorage.getItem("userid")
            }
        })
        console.log("user id -> "+sessionStorage.getItem("userid")   )
        console.log("token -> "+sessionStorage.getItem("jwt") )

        listaReceitas = res.data;
       
        var body = document.getElementById("grade_componentes")
        
        for(let i = 0 ; i < listaReceitas.length ; i++){
            const id = listaReceitas[i].idReceita
            console.log("id"+id)
            
            const divComponent = this.document.createElement('div')
            divComponent.setAttribute("id", "componente#"+id )
            divComponent.setAttribute("class", "card" )
            const title = this.document.createElement('h2')
            title.innerText = listaReceitas[i].nomeReceita
            const divImg = this.document.createElement("div")
            divImg.setAttribute("class", "divimagem")
            const imagem = this.document.createElement('img')
            const link = "https://api.lorem.space/image/burger?w=50&h=50"
            imagem.src = link
            divImg.appendChild(imagem)
            const desc = this.document.createElement('p')
            desc.innerText = listaReceitas[i].descricao
            divComponent.appendChild(title)
            divComponent.appendChild(divImg)
            divComponent.appendChild(desc)
            body.appendChild(divComponent)
        }
    } catch (error) {
        console.log("Erro ao buscar receitas:"+ error);
        // Aqui você pode tratar o erro de acordo com suas necessidades
        return null;
    }
})
