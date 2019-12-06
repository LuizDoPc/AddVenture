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

function salvarAlteracoesAventura (self) {
  let dados = new FormData(self);
  let id = dados.get('id');
  dados.delete('id');
  dados.set('token', getSession('token'));
  errorFormShow(false, self);
  loadingFormShow(self);

  $.ajax({
    type: "PUT",
    url: "http://localhost:4444/aventura/"+id,
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(Object.fromEntries(dados)),
    success: function(res) {
      msgFormPopUp(self, true, '<p class="h1 mb-0"><b>"'+res[0].title+'"</b></p><p class="h4 mb-3">Aventura alterada com sucesso!</p>\
      <p><a class="btn btn-primary" href="home.guia.html" target="include">Atualizar página</a></p>');
      loadingFormShow(self, false);
    },
    error: function(xhr, status, error) {
      console.log('3')
      errorFormShow (true, self, 'Erro inexperado. Tente novamente!');
    }
  })
}


$(document).ready(function(){
  $('nav .logout').click(function() {
    unsetSession();
    checkAuth();
  });

  recuperaAventurasHome();
  eventosModaisAventura();

  $(document).on('submit','.form-modal-aventura', function(e){
    salvarAlteracoesAventura(this);
    e.preventDefault();
    return false;
  })

})