checkAuth();

//aventuras dispoe aventuras
 function displayAventuras (aventuras = []) {
  var editable = false;
  if (getSession('user')['user_type'] == 0) editable = true;

  if (aventuras.length > 0) {
    var createElements = '';
    let aventuraDestaque = aventuras[0];

    delete aventuras[0];
    let jumbotron = '<div class="jumbotron p-0" style="background-image: url(\'../imgs/addventure/addventure'+(aventuraDestaque['id']%12)+'.jpg\')">\
    <div class="bg-linear rounded">\
      <div>\
        <h1 class="display-4">'+aventuraDestaque['title']+'</h1>\
        <div class="details"><span><i class="fa fa-calendar"></i> '+formatDate(aventuraDestaque['date'])+'</span>'
        
        if (aventuraDestaque['user'] != undefined) {
          jumbotron += '<span><i class="fa fa-user"></i> Oferecido por '+aventuraDestaque['user']+'</span>'
        }

        if (aventuraDestaque['categoria'] != undefined) {
          jumbotron += '<span><i class="fa fa-check"></i> Inscrito na categoria '+aventuraDestaque['categoria']+'</span>'
        }

        if (aventuraDestaque['qtd'] != undefined) {
          s = aventuraDestaque['qtd'] > 1 ? 's' : ''
          jumbotron += '<span><i class="fa fa-check"></i> '+aventuraDestaque['qtd']+' inscrito'+s+'</span>'
        }

      jumbotron += '</div>\
        <p>'+aventuraDestaque['description']+'</p>\
        <a class="btn btn-primary btn-lg" href="?page=aventura&id='+aventuraDestaque['id']+'">Ver aventura</a>\
      </div>\
    </div>\
    </div>';

    createElements += jumbotron;

    card = '<div class="card-rows">';

    aventuras.forEach(function(aventura){
      card += '<div class="card">\
              <div class="card-img-top" style="background-image: url(\'../imgs/addventure/addventure'+(aventura['id']%12)+'.jpg\')"></div>\
              <div class="card-body">\
                <h5 class="card-title m-0">'+aventura['title']+'</h5> ';

      if (aventura['categoria'] != undefined) {
        card += '<span class="text-muted m-0"><i class="fa fa-check"></i> Inscrito na categoria '+aventura['categoria']+'</span>'
      }

      card += '<p class="text-muted m-0"><span><i class="fa fa-calendar"></i> '+formatDate(aventura['date'])+'</span>';

      if (aventura['user'] != undefined) {
        card += '<span><i class="fa fa-user"></i> Oferecido por '+aventura['user']+'</span>'
      }

      if (aventura['qtd'] != undefined) {
        s = aventura['qtd'] > 1 ? 's' : ''
        card += '<span><i class="fa fa-check"></i> '+aventura['qtd']+' inscrito'+s+'</span>'
      }

      card += '</p><p class="card-text">'+aventura['description']+'</p>\
                <a href="?page=aventura&id='+aventura['id']+'" target="include" class="btn btn-primary">Ver aventura</a>\
              </div>\
            </div>';
      
    })
    card += '</div>';


    createElements += card;

    
  }
  else {
    createElements = "Ainda não há aventuras cadastradas!"
  }

  $('.lista-aventuras').html(createElements);
}


function incluirPagina (src,) {
  var vars = {};
  var parts = src.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value
  });

  window.history.replaceState('','',src)

  if (vars['page'] == 'home') {
    switch (getSession('user')['user_type']) {
      case 0:
        vars['page'] = 'home.guia';
        break;
      case 1:
        vars['page'] = 'home.aventureiro';
        break;
    }
  }

  $('.include').load('include/'+vars['page']+'.html');
}


function menu () {
  var menu = {
    0: {
      "Minhas aventuras": "?page=home",
      "Cadastrar nova aventura": "?page=cadastrar.aventura"
    },

    1: {
      "Aventuras disponíveis": "?page=home",
      "Minhas inscrições": "?page=minhas.inscricoes"
    }
  }

  nav = ''

  for (const [item, link] of Object.entries(menu[parseInt(getSession('user')['user_type'])])) {
    nav += '<li class="nav-item">\
    <a class="nav-link" href="'+link+'" target="include">'+item+'</a>\
  </li>'
  }

  $("#menu").prepend(nav)
}



function retornaInscritos (adventure_id) {
  retorno = false;
  $.ajax({
    type: "GET",
    async: false,
    url: "http://localhost:4444/aventura/"+adventure_id+"/subscription",
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function(res) {
      retorno = res;
    }
  });
  return retorno;
}


$(document).ready(function(){
  menu()

  $(document).on('click', 'a[target="include"]', function(e){
    incluirPagina($(this).attr('href'));
    e.preventDefault();
  });

  if (getUrlVars('page') !== undefined) incluirPagina(getUrlVars(true));
  else incluirPagina("?page=home");
  
  campoProfile();

  $('a.logout').click(function(){
    unsetSession();
    checkAuth();
  });
})