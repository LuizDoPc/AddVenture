checkAuth();

 //aventuras crias pelo guia logado
function recuperaAventurasHome () {
  $.ajax({
    type: "GET",
    url: "http://localhost:4444/aventura",
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function(res) {
      aventuras = []
      res.forEach(function(aventura){
        aventura.adventure['user'] = aventura.user['login']
        aventuras.push(aventura.adventure)
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