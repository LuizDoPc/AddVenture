checkAuth();

 //aventuras crias pelo guia logado
function recuperaAventurasHome () {
  $.ajax({
    type: "GET",
    url: "http://localhost:4444/users/"+getSession('user')['id']+"/aventura",
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function(res) {
      aventuras = []
      res.forEach(function(aventura){
        aventura['qtd'] = retornaInscritos(aventura['id']).length
        aventuras.push(aventura)
      })
      displayAventuras(aventuras);
    },
    error: function(err) {
      return err;
    }
  });
}

$(document).ready(function(){
  recuperaAventurasHome();

})