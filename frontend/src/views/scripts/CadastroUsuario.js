const api = "http://localhost:3001/api"


window.addEventListener("load", async function () {

    const formCadastroUser =  this.document.getElementById('form_cad_user')

    formCadastroUser.addEventListener("submit", async (event) =>{
        event.preventDefault();
      //  let nome = document.querySelector('#nome').value
      //  console.log("nome  ->" +nome)
       // let email = document.querySelector("#email").value
       // let password =document.querySelector("#password").value
       // let repetpassword =document.querySelector("#repetsenha").value
      //  let dataNascimento = this.document.querySelector("#birthdate").value

        const formData = new FormData(formCadastroUser)
        const data =  Object.fromEntries(formData.entries())
        console.log("nome data  ->" +data.nome)
        console.log("email data -> "+data.email)
        console.log("senha password -> "+data.password)
        console.log("repet  repeat password data -> "+data.repeatpassword)
        
        console.log("repet  senha data -> "+data.dataNascimento)

        /*if(data.password != data.repeatpassword){
            alert ("As senhas nao conferem, tente novamente")
            return false
        }*/
        if(!data.nome ||!data.email||!data.password || !data.repeatpassword){
            alert("Preencha todos os campos!")
            return false
        }
        const dados = {nome : nome , email : email, password : password , dataNascimento : dataNascimento}

        try {
            await axios.post("http://localhost:3001/api/cadastro_usuario", {
                nome : data.nome , 
                email : data.email, 
                password : data.password , 
                repeatpassword : data.repeatpassword,
                dataNascimento : data.dataNascimento
            }).then( (response) =>{
                console.log(response.data)
                window.location.href="/login"
            })
    
    
           
           
          } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            // Aqui você pode tratar o erro de acordo com suas necessidades
            return null;
          }
        
                               
     
    })


    

    
    
}) 