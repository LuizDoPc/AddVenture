checkAuth();

function cadastrarAventura (self) {
  let dados = new FormData(self);
  dados.set('token', getSession('token'));
  errorFormShow(false, self);
  loadingFormShow(self);

  $.ajax({
    type: "POST",
    url: "http://localhost:4444/users/"+getSession('user')['id']+"/aventura",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(Object.fromEntries(dados)),
    success: function(res) {
      msgFormPopUp(self, true, '<p class="h1 mb-0"><b>"'+res.title+'"</b></p><p class="h4 mb-3">Aventura castrada com sucesso!</p>\
      <p><a class="btn btn-primary" href="include/home.guia.html" target="include">Voltar para home</a></p>');
      loadingFormShow(self, false);
    },
    error: function(xhr, status, error) {
      errorFormShow (true, self, 'Erro inexperado. Tente novamente!');
    }
  })
}

$(document).ready(function(){
  if (getUrlVars()['edit'] == 1) {
    alert('oi');
  }

  console.log(getUrlVars())

  $('#nova-aventura').submit(function(e){
    cadastrarAventura(this);
    e.preventDefault();
    return false;
  })
});