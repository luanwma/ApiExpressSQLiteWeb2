
const api = "http://localhost:3001/api"


window.addEventListener("load", async function () {
       
        const logado = sessionStorage.getItem("jwt");
        
        if (logado) {
            const head1 = document.getElementById("headerId1").innerHTML = "";
            
        } else {
            const head2 = document.getElementById("headerId2").innerHTML = "";
            
        }
       
})