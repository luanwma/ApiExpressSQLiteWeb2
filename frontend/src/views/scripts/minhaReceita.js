
const api = "http://localhost:3001/api"

var tempId
var receita

var imagens 
window.addEventListener("load", async function () {
    try {

        const idReceita = sessionStorage.getItem("idReceita");

        const res = await axios.get(`http://localhost:3001/api/minha_receita/${idReceita}`, {
            headers :{
                token : sessionStorage.getItem("jwt"),
                userid : sessionStorage.getItem("userid"),
               
            },
            
        })
       
        console.log("user id -> "+sessionStorage.getItem("userid")   )
        console.log("token -> "+sessionStorage.getItem("jwt") )
        console.log("idReceita -> "+sessionStorage.getItem("idReceita") )
        receita = res.data;
       
        var body = document.getElementById("grade_componente")
        const divComponent = document.createElement("div")
        const tempId = "componente#"+idReceita
        divComponent.setAttribute("id",tempId)
        divComponent.setAttribute("class", "card" )
        const title = this.document.createElement('h1')
        title.innerText = receita.nomeReceita
       /* const imgDiv = this.document.createElement("div")
        imgDiv.setAttribute("class","divImagem")
        const img = this.document.createElement("img")
        const  shuffledImages = shuffle(imagens);
        const randomImage = shuffledImages[0];
        img.src = randomImage
        */
       const divDescricao = this.document.createElement("div")
       divDescricao.setAttribute("class", "divdescricao")
       const pDescricao = this.document.createElement("p")
       pDescricao.innerText = receita.descicao
       pDescricao.setAttribute("id", "pDescricao")
       divDescricao.appendChild(pDescricao)
       const divContent = this.document.createElement("div")
       divContent.setAttribute("class", "divPcontent")
       const pIngredientes = this.document.createElement("p")
       pIngredientes.setAttribute("id", "pIngredientes")
       pIngredientes.innerText = receita.ingredientes
       const pModoPreparo = this.document.createElement("p")
       pModoPreparo.setAttribute("id", "pModoPreparo")
       pModoPreparo.innerText=receita.modoDepreparo

       divContent.appendChild(pIngredientes)
       divContent.appendChild(pModoPreparo)
       divComponent.appendChild(title)
       divComponent.appendChild(divDescricao)
       divComponent.appendChild(divContent)
       body.appendChild(divComponent)


        


        
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
      try {
        const res = await axios.get(`http://localhost:3001/api/minha_receita/${idReceita}`, {
          headers: {
            token: sessionStorage.getItem("jwt"),
            userid: sessionStorage.getItem("userid"),
            idReceita : idReceita
          },
          
        })


        console.log(res);
        window.location.href = `/minha_receita`;
      } catch (error) {
        console.error("Erro ao abrir receita:", error)
      }
    })
  }