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
      displayAventuras(res);
    },
    error: function(err) {
      return err;
    }
  });
}

$(document).ready(function(){
  $('nav .logout').click(function() {
    unsetSession();
    checkAuth();
  });

  recuperaAventurasHome();
  eventosModaisAventura();

})