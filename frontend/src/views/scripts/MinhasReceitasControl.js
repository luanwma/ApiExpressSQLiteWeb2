const api = "http://localhost:3001/api"

var tempId
var listaReceitas = []
var selectCard
const cards = []
var count = 0
var itensPagina = 5

var index =0 
var pagAtual 


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

        
       
        var body = this.document.getElementById("divBotaoMais")        
       
        

        const botaoVerMais = this.document.createElement("button")
        botaoVerMais.innerHTML="ver mais receitas"
       
        botaoVerMais.setAttribute("id", "btnVerMais")
   
        
        body.appendChild(botaoVerMais)

        botaoVerMais.addEventListener("click", () => {
          pagAtual = index+5
         
          abrirMais(listaReceitas) 
          
        
        } )
        

        /*
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
            cards.push(divComponent)
           // body.appendChild(divComponent)
            addClickEvent(tempId);
           // console.log("temp id "+tempId)
            selectCard = document.getElementById(tempId)
          //  console.log(selectCard)
          
         

          
        }*/
        //console.log(cards)
        
         

       /* botaoVerMais.addEventListener("click", () =>{

          for(var i = index; i < cards.length ; i++){
            body.appendChild(cards[i])
          }
        })
        */


       



        
    } catch (error) {
        console.log("Erro ao buscar receitas:"+ error);
        if(listaReceitas.length == 0){
          alert("Nenhuma Receita Encontrada")
        }
        
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

  function addExcluirEvent(componenteId){
    const delCard = document.getElementById(componenteId);
    delCard.addEventListener("click", async () =>{
      const idReceita = componenteId.split("#")[1]
      console.log("idReceita click -> "+idReceita)
      sessionStorage.setItem("idReceita", idReceita)
      try {
        const res = await axios.delete(`http://localhost:3001/api/deletar_receita/${idReceita}`, {
          headers: {
            token: sessionStorage.getItem("jwt"),
            userid: sessionStorage.getItem("userid"),
            
          }
        })
        
      } catch (error) {
        console.log("Erro ao excluir receita:", error)
      }
    })
  }

  function abrirMais(listaReceitas){
    pagAtual

    var body = document.getElementById('grade_componentes');
    
    for(let i = index ; i < pagAtual ; i++){
      const id = listaReceitas[i].idReceita

      console.log("id"+id)
      var tempId = "componente#"+id
      const divComponent = document.createElement('div')
      divComponent.setAttribute("id", tempId )
      divComponent.setAttribute("class", "card" )
      const title = document.createElement('h3')
      title.innerText = listaReceitas[i].nomeReceita
    

   
      const desc = document.createElement('p')
      desc.innerText = listaReceitas[i].descricao
      divComponent.appendChild(title)
     // divComponent.appendChild(divImg)
      divComponent.appendChild(desc)
      cards.push(divComponent)
     body.appendChild(divComponent)
      addClickEvent(tempId);
     // console.log("temp id "+tempId)
      selectCard = document.getElementById(tempId)
    //  console.log(selectCard)

    
    
   

    
  }

    


  }



