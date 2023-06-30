const api = "http://localhost:3001/api"

const btnLogout = document.getElementById('deslogar')
btnLogout.addEventListener("click", async () =>{
    try {
      
        sessionStorage.clear();
        window.location.href = '/login';
    } catch (error) {
        console.log('Erro ao deslogar -> '+ error);
    }
})


/*
window.addEventListener("load", async function () {
    console.log("entrou")
       
    const btnLogout = document.getElementById('deslogar')
    
    btnLogout.addEventListener("click", async () =>{
        try {
            await axios.get("http://localhost:3001/api/deslogar")
            sessionStorage.clear();
            window.location.href = '/login';
        } catch (error) {
            console.log('Erro ao deslogar -> ', error);
        }
    })
   
})
*/