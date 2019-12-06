function recuperaAventurasCadastradas () {
  
}


$(document).ready(function(){
  $('nav .logout').click(function() {
    unsetSession();
    checkAuth();
  });



})