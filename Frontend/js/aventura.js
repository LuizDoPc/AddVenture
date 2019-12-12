checkAuth();

function tiposDeAventura () {
  retorno = []
  $.ajax({
    type: "GET",
    url: "http://localhost:4444/tipo-aventura",
    async: false,
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function(res) {
      retorno = res
    }
  });
  return retorno;
}

var aventura_id = getUrlVars('id');
var tipos_aventura = tiposDeAventura()
var ehInscrito = getSession('user')['id'] == 1 ? userIsSubscripted(getSession('user')['id'], aventura_id) : false;

function carregaAventura(id) {
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

      const aventura = aventuras.find(search => search.id == id);
      if (aventura === undefined) {
        alert("Aventura não encontrada!")
        incluirPagina("?page=home")
      }
      else if (getSession('user')['user_type'] == 0) {
        if (getSession('user')['login'] == aventura['user']) exibeAventura(aventura, true);
        else {
          alert("Aventura não encontrada!")
          incluirPagina("?page=home")
        }

      }
      else if (getSession('user')['user_type'] == 1) {
        exibeAventura(aventura)
      }

      
    },
    error: function(err) {
      alert("Erro")
      incluirPagina("?page=home")
    }
  });
}

function userIsSubscripted(user_id, adventure_id) {
  retorno = true;
  $.ajax({
    type: "GET",
    url: "http://localhost:4444/users/"+user_id+"/subscription",
    async: false,
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function(res) {
      const existe = res.find(search => search.adventure_id == adventure_id);
      if (existe === undefined)
        retorno = false
      retorno = existe;
    }
  });
  return retorno;
}

function exibeAventura(aventura, edit=false) {
  if (aventura) {
    var createElements = '';

    let jumbotron = '<div class="jumbotron p-0 height-190 mb-0" style="background-image: url(\'../imgs/addventure/addventure'+(aventura['id']%12)+'.jpg\')">\
      <div class="bg-linear rounded">\
      <h1 class="display-4">'+aventura['title']+'</h1>\
      </div>\
      </div>';

    createElements += jumbotron

    createElements += '<div class="d-flex details">\
                  <div class="mr-auto">';

    if (!edit) {
      createElements += ' <span><i class="fa fa-user"></i> '+aventura['user']+'</span>';
    }

    createElements += '\
      <span><i class="fa fa-calendar"></i> '+formatDate(aventura['date'])+'</span>'

    if (!edit)
      createElements += ' <span><i class="fa fa-check"></i> Inscrito na categoria '+ehInscrito.adventure_type.description+'</span><br>';
    else {
      qtd = retornaInscritos(aventura_id).length
      s = qtd > 1 ? 's' : ''
      createElements += ' <span><i class="fa fa-check"></i> '+qtd+' inscrito'+s+'</span><br>';
    }
    
    createElements += '<span><i class="fa fa-map-pin"></i> '+aventura['location']+'</span></div><div class="menu ml-auto">';

    if (edit) {
      createElements += '\
        <a href="?page=editar.aventura&id='+getUrlVars('id')+'" target="include" class="btn btn-primary">\
          <i class="fa fa-pencil"></i> Editar aventura\
        </a>\
        \
        <button target="include" class="btn btn-danger" id="excluir">\
          <i class="fa fa-trash"></i> Excluir aventura\
        </button>'
    }
    else {
      createModelAdventureType(getSession('user')['id'], aventura_id);

      if (!ehInscrito) {
        createElements += '\
          <button class="btn btn-primary" id="inscrever" role="button" data-toggle="modal" data-target="#modal-tipo-aventura">\
            <i class="fa fa-check"></i> Inscrever-se\
          </button>'
      }
      else {
        createElements += '\
        <button class="btn btn-primary" id="editar-inscricao" role="button" data-toggle="modal" data-target="#modal-tipo-aventura">\
            <i class="fa fa-pencil"></i> Alterar categoria\
          </button>\
          <button class="btn btn-danger" id="cancelar-inscricao">\
            <i class="fa fa-times"></i> Cancelar inscrição\
          </button>'
      }
    }
    createElements += '</div>' // div .menu
    createElements += '</div>' // div .details

    createElements += '<div class="description">'+aventura['description']+'</div>'
  }
  else createElements = 'Aventura não encontrawda!';

  $('.aventura').html(createElements)
  
}

function excluirAventura(id) {
  $.ajax({
    type: "DEL",
    url: "http://localhost:4444/aventura/"+id,
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function () {
      alert("Aventura excluida com sucesso!")
      incluirPagina("?page=home")
    },
    error: function(xhr, b, c) {
      alert("Algo deu errado. Tente novamente!")
    } 
  })
}


function createModelAdventureType (user_id, adventure_id) {
  var modal = '<div class="modal fade" id="modal-tipo-aventura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
    <div class="modal-dialog" role="document">\
      <div class="modal-content">\
        <div class="modal-header">\
          <h5 class="modal-title" id="exampleModalLabel">Selecione uma categoria</h5>\
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">\
            <span aria-hidden="true">&times;</span>\
          </button>\
        </div>\
        <div class="modal-body">\
          <div class="form-global">\
            <form class="form-modal-aventura text-center" method="post">\
              <input type="hidden" name="user_id" value="'+user_id+'">\
              <input type="hidden" name="adventure_id" value="'+adventure_id+'">';
  
    tipos_aventura.forEach(function(tipo) {
    modal += '<div class="form-check form-check-inline">\
      <input class="form-check-input" type="radio" name="adventure_type_id" id="'+tipo.description+'-'+tipo.id+'" value="'+tipo.id+'" required>\
      <label class="form-check-label btn" for="'+tipo.description+'-'+tipo.id+'">\
      <i class="fa fa-square"></i>\
      <i class="fa fa-check-square"></i>\
      '+tipo.description+'</label>\
    </div>'
  })

  let botao = 'Inscrever'
  if (ehInscrito) botao = 'Salvar'

  modal += '<div class="hr"></div>\
  <div class="container px-0 text-right footer">\
                <a href="#" class="mr-3 descartar" data-dismiss="modal">Cancelar</a>\
                <button type="submit" class="btn btn-primary">'+botao+'</button>\
              </div>\
            </form>\
          </div>\
      </div>\
    </div>\
  </div>';


  $('body').append(modal);;
}


$(document).ready(function(){
  carregaAventura(aventura_id);

  $(document).on('click', '#excluir', function(){
    if (confirm('Após a exclusão, não há como recuperar a aventura.\nDeseja excluir a aventura?')) {
      excluirAventura(aventura_id)
    }
  })


  $(document).on('submit', '.form-modal-aventura', function(e){
    let self = this;

    errorFormShow(false, self);
    loadingFormShow(self);

    let dados = new FormData(self);
    let metodo = "POST"
    let url = 'users/'+getSession('user')['id']+'/subscription'
    
    if (ehInscrito) {
      metodo = "PUT"
      url = 'subscription/'+ehInscrito['id']
    }

    $.ajax({
      type: metodo,
      url: "http://localhost:4444/"+url,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        "token": getSession('token'),
        "adventure_id": dados.get('adventure_id'),
        "adventure_type_id": dados.get('adventure_type_id')
      }),
      success: function(res) {
        if (ehInscrito) {
          msgFormPopUp(self, true, '<p class="h4 mb-3">Alteração salva!</p>\
          <p><a class="btn btn-primary" href="?page=minhas.inscricoes">Ir para suas inscrições</a></p>');
        }
        else {
          msgFormPopUp(self, true, '<p class="h4 mb-3">Inscrição efetuada!</p>\
          <p><a class="btn btn-primary" href="?page=minhas.inscricoes">Ir para suas inscrições</a></p>');
        }
        loadingFormShow(self, false);
      },
      error: function(err) {
        loadingFormShow(self, false);
        errorFormShow (true, self, 'Erro inexperado. Tente novamente!');
      }
    });
    
    e.preventDefault();
    return false;
  })

  $(document).on('click', '#cancelar-inscricao', function(e){
    if (confirm("Deseja realmente cancelar sua inscrição nessa aventura?")) {


      $.ajax({
        type: "DEL",
        url: "http://localhost:4444/subscription/"+ehInscrito['id'],
        headers: {
          "Content-Type": "application/json"
        },
        data: "token="+getSession('token'),
        success: function(res) {
          alert("Inscrição cancelada!")
          incluirPagina("?page=home")
        },
        error: function(err) {
          alert("Algo deu errado. Tente novamente!")
        }
      });

      
    }
    e.preventDefault()
  })
})