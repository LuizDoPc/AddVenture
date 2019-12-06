pageUnauthorized('index.html', true, 0);

 //aventuras crias pelo guia logado
function recuperaAventurasHome (token) {

/*
  $.ajax({
    type: "GET",
    url: "http://localhost:3333/users/2/aventura",
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getLocalStorage('token'),
    success: function(res) {
      return res;
    },
    error: function(err) {
      return err;
    }
  });
  */
  

  

 let aventuras = [];

  for (i = 0; i<15; i++){
    let aventura = {
      title: 'Aventura '+(i+1),
      date: '27/10/2020',
      location: 'Lavras',
      description: 'Uma aventura bem loca bla bla abssa vas asf sa f nkasjfh lkjasfh jkas jhfaj hasflkj',
      user_id: getLocalStorage('token')
    }
    aventuras.push(aventura);
  }


  return aventuras;


}


$(document).ready(function(){
  $('nav .logout').click(function() {
    unsetSession();
    pageUnauthorized("login.html");
  });

  minhasAventuras = recuperaAventurasHome(getLocalStorage('token'));
  displayAventuras(minhasAventuras);
  eventosModaisAventura();
})