pageUnauthorized('index.html', true, 1);

function recuperaAventurasCadastradas () {
  
}


$(document).ready(function(){
  $('nav .logout').click(function() {
    unsetSession();
    pageUnauthorized("login.html");
  });



})