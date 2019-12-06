checkAuth();

function createModalAdventure (aventura=[], id, editable=false) {
  var tituloModal = '';
  if (aventura.length == 0) {
    tituloModal = 'Cadastrar nova aventura';
    aventura['id'] = '';
    aventura['title'] = '';
    aventura['date'] = '';
    aventura['location'] = '';
    aventura['description'] = '';
  }
  else
    tituloModal = aventura['title'];

  if (editable) {
  var modal = '<div class="modal fade" id="modalAdventure'+aventura['id']+'" tabindex="-1" role="dialog">\
    <div class="modal-dialog" role="document">\
      <div class="modal-content">\
\
        <div class="modal-header">\
          <h5 class="modal-title">'+aventura['title']+'</h5>\
          <button type="button" class="close text-danger" data-dismiss="modal">\
            <span class="fa fa-times"></span>\
          </button>\
        </div>\
\
        <div class="modal-body">\
          <div class="form-global">    \
            <form class="form-modal-aventura" method="post">\
              <input type="hidden" name="id" value="'+aventura['id']+'">\
    \
              <label for="title" class="input-group">\
                <input type="text" class="form-control" id="title" name="title" placeholder="Título" value="'+aventura['title']+'" backup="'+aventura['title']+'" required="">\
              </label>\
              \
              <label class="input-group" for="date">\
                <div class="input-group-prepend">\
                  <span class="input-group-text"><i class="fa fa-calendar"></i></span>\
                </div>\
                <input type="date" class="form-control" id="date" name="date" placeholder="Data" value="'+aventura['date']+'" backup="'+aventura['date']+'" required="">\
              </label>\
              \
              <label class="input-group" for="location">\
                <div class="input-group-prepend">\
                  <span class="input-group-text"><i class="fa fa-map-pin"></i></span>\
                </div>\
                <input type="input" class="form-control" id="location" name="location" placeholder="Local" value="'+aventura['location']+'" backup="'+aventura['location']+'" required="">\
              </label>\
              \
              <label class="input-group" for="description">\
                <textarea class="form-control" id="description" name="description" placeholder="Descrição" backup="'+aventura['description']+'" required>'+aventura['description']+'</textarea>\
              </label>\
              \
              <div class="container px-0 text-right footer">\
                <a href="#" class="mr-3 descartar" data-dismiss="modal">Descartar alterações</a>\
                <button type="submit" class="btn btn-primary">Salvar alterações</button>\
              </div>\
              \
            </form>\
            \
          </div>\
          \
        </div>\
\
      </div>\
    </div>\
  </div>';

  return modal;
  }
}

function eventosModaisAventura () {
  $('.modal').on('hidden.bs.modal', function () {
    var formulario = $(this).find('form');
    
    formulario.find('textarea, input').each(function() {
      $(this).val($(this).attr('backup'));
    })
  })
}

//aventuras dispoe aventuras
 function displayAventuras (aventuras = []) {
  var editable = false;
  if (getSession('user')['user_type'] == 0) editable = true;

  if (aventuras.length > 0) {
    let createElements = '';
    let indexSorteio = Math.floor(Math.random() * aventuras.length);
    let aventuraDestaque = aventuras[indexSorteio];
    delete aventuras[indexSorteio];
  
    let jumbotron = '<div class="jumbotron">\
    <h1 class="display-4">'+aventuraDestaque['title']+'</h1>\
    <p>'+aventuraDestaque['description']+'</p>\
    <p>'+aventuraDestaque['date']+'</p>\
    <a class="btn btn-primary btn-lg" href="#" role="button" data-toggle="modal" data-target="#modalAdventure'+aventuraDestaque['id']+'">Ver detalhes</a>\
    </div>';
    $('body').append(createModalAdventure(aventuraDestaque, aventuraDestaque['id'], editable));

    createElements += jumbotron;

    card = '<div class="card-rows">';

    aventuras.forEach(function(aventura){
      card += '<div class="card">\
              <!-- img class="card-img-top" src=".../100px160/" alt="Card image cap" -->\
              <div class="card-body">\
                <h5 class="card-title">'+aventura['title']+'</h5>\
                <p class="card-text">'+aventura['description']+'</p>\
                <p class="card-text"><small class="text-muted">'+aventura['date']+'</small></p>\
                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modalAdventure'+aventura['id']+'">Ver detalhes</a>\
              </div>\
            </div>';
      
      $('body').append(createModalAdventure(aventura, aventura['id'], editable));
    })
    card += '</div>';


    createElements += card;

    $('.lista-aventuras').html(createElements);
  }
}


function incluirPagina (src) {
  $('.include').load(src);
}


$(document).ready(function(){
  $(document).on('click', 'a[target="include"]', function(e){
    incluirPagina($(this).attr('href'));
    e.preventDefault();
  });

  switch (getSession('user')['user_type']) {
    case 0:
      incluirPagina('../html/include/home.guia.html');
      break;
    case 1:
      incluirPagina('../html/include/home.aventureiro.html');
      break;
  }
  
  campoProfile();

  $('a.logout').click(function(){
    unsetSession();
    checkAuth();
  });
})