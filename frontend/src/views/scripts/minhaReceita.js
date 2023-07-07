
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
        console.log("dados receita  "+res.data)
        receita = res.data;
       
        var body = document.getElementById("grade_componente")
        const divComponent = document.createElement("div")
        const tempId = "componente#"+idReceita
        divComponent.setAttribute("id",tempId)
        divComponent.setAttribute("class", "card" )
        const title = this.document.createElement('h1')
        const titulo = receita.nomeReceita[0].toUpperCase() + receita.nomeReceita.substring(1)
        title.innerText = titulo
       /* const imgDiv = this.document.createElement("div")
        imgDiv.setAttribute("class","divImagem")
        const img = this.document.createElement("img")
        const  shuffledImages = shuffle(imagens);
        const randomImage = shuffledImages[0];
        img.src = randomImage
        */
       const divDescricao = this.document.createElement("div")
       divDescricao.setAttribute("class", "divdescricao")
       const des = this.document.createElement("h2")
       des.innerText = "Descrição"
       divDescricao.appendChild(des)
       const pDescricao = this.document.createElement("p")
       pDescricao.innerText = receita.descricao
       pDescricao.setAttribute("id", "pDescricao")
       divDescricao.appendChild(pDescricao)
       const divContent = this.document.createElement("div")
       divContent.setAttribute("class", "divPcontent")
       const ing = this.document.createElement("h2")
       ing.innerText="Ingredientes"
       divContent.appendChild(ing)
       const pIngredientes = this.document.createElement("p")
       pIngredientes.setAttribute("id", "pIngredientes")
       pIngredientes.innerText = receita.ingredientes
       divContent.appendChild(pIngredientes)
       const pre = this.document.createElement("h2")
       pre.innerText = "Modo de Preparo"
       divContent.appendChild(pre)
       const pModoPreparo = this.document.createElement("p")
       pModoPreparo.setAttribute("id", "pModoPreparo")
       pModoPreparo.innerText=receita.modoPreparo
       divContent.appendChild(pModoPreparo)
       divComponent.appendChild(title)
       divComponent.appendChild(divDescricao)
       divComponent.appendChild(divContent)

       const divBtns = this.document.createElement("div")
       const btnDel = this.document.createElement("button")
       btnDel.setAttribute("id","btnDelete")
       
       btnDel.innerText = "Excluir"

       btnDel.addEventListener("click", async (event) => {
        deleteReceita(event, idReceita)
       })
       divBtns.appendChild(btnDel)
     //  addExcluirEvent(btnDel, idReceita)
       divComponent.appendChild(divBtns)
       body.appendChild(divComponent)



        
    } catch (error) {
        console.log("Erro ao buscar receitas:"+ error);
        // Aqui você pode tratar o erro de acordo com suas necessidades
        return null;
    }



})


async function deleteReceita(event, idReceita){
 
  try {
    event.preventDefault();
    await axios.delete(`http://localhost:3001/api/deletar_receita/${idReceita}`, {
      headers: {
        token: sessionStorage.getItem("jwt"),
        userid: sessionStorage.getItem("userid"),
        
      }
      
    })
    console.log("delete receita ")
    window.location.href = "http://localhost:3000/minhas_receitas"
   // window.location.replace("/minhas_receitas")
  } catch (error) {
    console.error("Erro ao deletar receita:", error)
  }finally{
    window.location.href = "http://localhost:3000/minhas_receitas"
  }
  
}

/*
function addClickEvent(btn, idReceita) {
    const selectCard = document.getElementById(btn);
    selectCard.addEventListener("click", async () => {
    
      try {
        const res = await axios.delete(`http://localhost:3001/api/deletar_receita/${idReceita}`, {
          headers: {
            token: sessionStorage.getItem("jwt"),
            userid: sessionStorage.getItem("userid"),
            
          },
          
        })


        console.log(res);
        window.location.href = `/minha_receita`;
      } catch (error) {
        console.error("Erro ao abrir receita:", error)
      }
    })
  }


  function addExcluirEvent(btn, idReceita){
    const delCard = document.getElementById(btn);
    console.log("del card "+idReceita)
    delCard.addEventListener("click", async () =>{
     
      
      try {
        const res = await axios.delete(`http://localhost:3001/api/deletar_receita/${idReceita}`, {
          headers: {
            token: sessionStorage.getItem("jwt"),
            userid: sessionStorage.getItem("userid"),
            
          }
        })
        
      } catch (error) {
        console.error("Erro ao excluir receita:", error)
      }
    })
  }
  */