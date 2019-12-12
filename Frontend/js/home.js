checkAuth();

//aventuras dispoe aventuras
 function displayAventuras (aventuras = []) {
  var editable = false;
  if (getSession('user')['user_type'] == 0) editable = true;

  if (aventuras.length > 0) {
    let createElements = '';
    let numAle = Math.floor(Math.random() * 10);
    let aventuraDestaque = aventuras[0];
    delete aventuras[0];
  
    let jumbotron = '<div class="jumbotron p-0" style="background-image: url(\'../imgs/addventure/addventure'+((numAle+aventuraDestaque['id'])%12)+'.jpg\')">\
    <div class="bg-linear rounded">\
      <div>\
        <h1 class="display-4">'+aventuraDestaque['title']+'</h1>\
        <div class="date"><span><i class="fa fa-calendar"></i> '+formatDate(aventuraDestaque['date'])+'</span></div>\
        <p>'+aventuraDestaque['description']+'</p>\
        <a class="btn btn-primary btn-lg" href="?page=aventura.guia&id='+aventuraDestaque['id']+'">Ver aventura</a>\
      </div>\
    </div>\
    </div>';

    createElements += jumbotron;

    card = '<div class="card-rows">';

    aventuras.forEach(function(aventura){
      card += '<div class="card">\
              <div class="card-img-top" style="background-image: url(\'../imgs/addventure/addventure'+((numAle+aventura['id'])%12)+'.jpg\')"></div>\
              <div class="card-body">\
                <h5 class="card-title m-0">'+aventura['title']+'</h5>\
                <p class="text-muted"><i class="fa fa-calendar"></i> '+formatDate(aventura['date'])+'</p>\
                <p class="card-text">'+aventura['description']+'</p>\
                <a href="?page=aventura.guia&id='+aventura['id']+'" target="include" class="btn btn-primary">Ver aventura</a>\
              </div>\
            </div>';
      
    })
    card += '</div>';


    createElements += card;

    $('.lista-aventuras').html(createElements);
  }
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


$(document).ready(function(){
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