

const api = "http://localhost:3001/api"

var listaCategorias = []
var catlist = document.getElementById('categoria')

window.addEventListener("load", async function () {
    try {
        const response = await axios.get("http://localhost:3001/api/listar_categorias", {
          headers: {
            token: sessionStorage.getItem("jwt"),
            userid: sessionStorage.getItem("userid")
          }
        })

       

        console.log("user id -> "+sessionStorage.getItem("userid")   )
        console.log("token -> "+sessionStorage.getItem("jwt") )
    
        listaCategorias = response.data;
        catlist = document.getElementById('categoria');
    
        for (let i = 0; i < listaCategorias.length; i++) {
          const optionElement = document.createElement('option');
          optionElement.value = listaCategorias[i].idCategoria;
          optionElement.textContent = listaCategorias[i].nomeCategoria;
          catlist.appendChild(optionElement);
        }
    
       // return categorias;
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        // Aqui você pode tratar o erro de acordo com suas necessidades
        return null;
      }

      const userid = sessionStorage.getItem("userid")
      console.log("user id -> "+sessionStorage.getItem("userid")   )
      
        const form1 = document.getElementById("form_receita")
        form1.addEventListener("submit", async (event) => {
        event.preventDefault()
        const nomeReceita = document.getElementById("nome").value
        const descricao = document.getElementById("descricao").value
        const ingredientes = document.getElementById("ingredientes").value
        const modoPreparo = document.getElementById("modoPreparo").value
        const idCat =  catlist.value
        
        /*const formData1= new FormData(form1)
        const data = Object.fromEntries(formData1.entries()) */
        console.log("nomeReceita -> "+nomeReceita)
        console.log("data descrica -> "+descricao)
        console.log("data ingredientes-> "+ingredientes)
        console.log("data modo preparo -> "+modoPreparo) 
        const dados = {nomeReceita : nomeReceita, descricao: descricao , 
            ingredientes: ingredientes, modoPreparo : modoPreparo , idCategoria:idCat, userid : userid}

        console.log(dados)

       

        
        await addReceita(dados)
    })
}) 

async function addReceita(dados) {
    console.log("nome "+dados.nomeReceita)
    console.log("add rec "+dados.userid)
    try{ 
        const response = await axios.post("http://localhost:3001/api/cadastro_receita", {
            nomeReceita : dados.nomeReceita, 
            descricao: dados.descricao , 
            ingredientes: dados.ingredientes, 
            modoPreparo : dados.modoPreparo, 
            idCategoria :  dados.idCategoria
        }, { 
            headers:{
            token : sessionStorage.getItem("jwt"),
            userid : dados.userid
        }})
       // console.log("user id -> "+userid )
       // console.log("token -> "+token )
        console.log(response)
        return true    
       
    }catch(erro){
        console.log("erro ao salvar receita "+erro)
        return null
    }
}
/*
async function buscarCategorias(){

     



    return await axios.get("http://localhost:3001/api/listar_categorias", {
        headers:{
            token : `${sessionStorage.getItem("jwt")}`,
            userid : `${sessionStorage.getItem("userid") }`
        }
    }).then( (response) =>{
        console.log(response.data.token)
        const token = response.data.token
        listaCategorias = response.data
        
        const catlist = document.getElementById('categoria')
        console.log("XXXXX")
        listaCategorias.forEach(item => {
            const optionElement = document.createElement('option');
            optionElement.value = item; // Define o valor da opção como o próprio item
            optionElement.textContent = item; // Define o texto da opção como o próprio item
            catlist.appendChild(optionElement); // Adiciona a opção ao elemento <select>
          });
        return listaCategorias
    }).catch( (erro) =>{
        console.error("Erro ao buscar categorias:", erro)
            return res.status(404).json({msg: erro}) 
    })
}
*/


async function buscarCategorias() {
    try {
      const response = await axios.get("http://localhost:3001/api/listar_categorias", {
        headers: {
          token: sessionStorage.getItem("jwt"),
          userid: sessionStorage.getItem("userid")
        }
      });
  
      const categorias = response.data;
      const catlist = document.getElementById('categoria');
  
      for (let i = 0; i < categorias.length; i++) {
        const optionElement = document.createElement('option');
        optionElement.value = array[i];
        optionElement.textContent = array[i];
        catlist.appendChild(optionElement);
      }
  
      return categorias;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      // Aqui você pode tratar o erro de acordo com suas necessidades
      return null;
    }
  }
  

function recarregar() {
    window.location.reload()
}