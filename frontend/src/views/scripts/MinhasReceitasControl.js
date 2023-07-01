const api = "http://localhost:3001/api"

var tempId
var listaReceitas = []
var selectCard

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
            tempId = "componente#"+id
            const divComponent = this.document.createElement('div')
            divComponent.setAttribute("id", tempId )
            divComponent.setAttribute("class", "card" )
            const title = this.document.createElement('h3')
            title.innerText = listaReceitas[i].nomeReceita
         
            const desc = this.document.createElement('p')
            desc.innerText = listaReceitas[i].descricao
            divComponent.appendChild(title)
           // divComponent.appendChild(divImg)
            divComponent.appendChild(desc)
            body.appendChild(divComponent)
            addClickEvent(tempId);
            console.log("temp id "+tempId)
            selectCard = document.getElementById(tempId)
            console.log(selectCard)
          
            





        }
    } catch (error) {
        console.log("Erro ao buscar receitas:"+ error);
        // Aqui você pode tratar o erro de acordo com suas necessidades
        return null;
    }

    


 
})


function addClickEvent(componentId) {
    const selectCard = document.getElementById(componentId);
    selectCard.addEventListener("click", async () => {
      const idReceita = componentId.split("#")[1]
      console.log("idReceita click -> "+idReceita)
      sessionStorage.setItem("idReceita", idReceita)

      //window.location.href = `/minha_receita/${idReceita}`;
      try {
        const res = await axios.get(`http://localhost:3001/api/minha_receita/${idReceita}`, {
          headers: {
            token: sessionStorage.getItem("jwt"),
            userid: sessionStorage.getItem("userid"),
            
          },
          
        })


        console.log(res);
        window.location.href = `/minha_receita/${idReceita}`;
      } catch (error) {
        console.error("Erro ao abrir receita:", error)
      }
      
    })
  }



