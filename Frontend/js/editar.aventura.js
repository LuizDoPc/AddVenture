checkAuth();

function carregaAventura(id) {
  $.ajax({
    type: "GET",
    url: "http://localhost:4444/users/"+getSession('user')['id']+"/aventura",
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function(res) {
      const aventura = res.find(aventuras => aventuras.id == id);
      if (aventura === undefined) {
        alert("Aventura não encontrada!")
        incluirPagina("?page=home.guia")
      }
      else {
        $("#title").val(aventura['title']).prop("disabled", false);
        $("#date").val(aventura['date']).prop("disabled", false);
        $("#location").val(aventura['location']).prop("disabled", false);
        $("#description").val(aventura['description']).prop("disabled", false);
      }
    },
    error: function(err) {
      alert("Erro")
      incluirPagina("?page=home")
    }
  });
}


function salvarAlteracoesAventura (self) {
  let dados = new FormData(self);
  dados.set('token', getSession('token'));
  errorFormShow(false, self);
  loadingFormShow(self);

  $.ajax({
    type: "PUT",
    url: "http://localhost:4444/aventura/"+getUrlVars('id'),
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(Object.fromEntries(dados)),
    success: function(res) {
      msgFormPopUp(self, true, '<p class="h1 mb-0"><b>"'+res[0].title+'"</b></p><p class="h4 mb-3">Aventura alterada com sucesso!</p>\
      <p><a class="btn btn-primary" href="?page=home" target="include">Voltar para home</a></p>');
      loadingFormShow(self, false);
    },
    error: function(xhr, status, error) {
      errorFormShow (true, self, 'Erro inexperado. Tente novamente!');
    }
  })
}


$(document).ready(function(){
  carregaAventura(getUrlVars('id'));

  $('.descartar').click(function(){
    return confirm("Nenhuma modificação será salva.\nDeseja realmente descartar as alterações?")
  })

  $('form#editar-aventura').submit(function(e){
    if (confirm("Depois de salvas, as altereções não podem ser desfeitas.\nDeseja salvar as alterações?"))
      salvarAlteracoesAventura(this);

    return false
    e.preventDefault()
  })
})