function getUrlVars(ret=null) {
  var vars = {};
  var str = "?"
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
      if (str == "?")
        str += key+"="+value;
      else
        str += "&"+key+"="+value;
  });
  if (ret === null) return vars;
  else if (ret === true) return str;
  else if (typeof(ret) === "string") return vars[ret];
  return false;
}





function loadingPage (show=true) {
  var body = $("body")
  if(body.find('.loading') !== null)
    body.find('.loading').remove();

  if (show) {
    let createLoading = '<div class="loading">\
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>\
    </div>';

    body.prepend(createLoading);
    
  }
}






function loadingFormShow (form, show=true) {
  let formGlobal = $(form).closest('.form-global');
  
  if(formGlobal.find('.loading') !== null)
    formGlobal.find('.loading').remove();

  if (show) {
    let createLoading = '<div class="loading">\
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>\
    </div>';

    formGlobal.prepend(createLoading);
    
  }
}




function msgFormPopUp (form, show=true, html='') {
  let formGlobal = $(form).closest('.form-global');

  if(formGlobal.find('.message') !== null)
    formGlobal.find('.message').remove();

  if (show) {
    let createMsg = '<div class="message">'+html+'</div>';

    formGlobal.prepend(createMsg);
    
  }
}




function errorFormShow (show=true, selector=null, msg='', oneInput=false) {
  let formGlobal = $(selector).closest('.form-global');
  loadingFormShow (selector, false);

  if (oneInput) {
    $(selector).closest('.input-group').addClass('error');
    $(selector).focus();
  }
  else
    formGlobal.addClass('error');
  

  if (show) {
    let errorContent = '<div class="container error-message"><i class="fa fa-exclamation-triangle"></i> '+msg+'</div>';
    formGlobal.find('.footer').before(errorContent);
  }
  else {
    formGlobal.removeClass('error');
    $(selector).removeClass('error');
    formGlobal.find('.error-message').remove();
  }
}




function campoProfile () {
  let user = getSession('user');
  
  tipo = 'aventureiro';
  if (user['user_type'] == 0) {
    tipo = 'guia';
  }

  var campo = '<div class="container rounded-right m-0 p-3 sticky-top profile">\
    <div class="username">\
      <div class="small">Logado com:</div>\
      '+user['name'].split(' ')[0].toUpperCase()+'\
    </div>\
    <div class="small">\
      Sua categoria de usuário é <b>'+tipo+'</b>.\
    </div>\
  </div>';

  $('.conteudo-dir').html(campo);
}



function formatDate (date) {
  var date = date.split("-");
  return date[2] + '/' + date[1] + '/' + date[0];
}