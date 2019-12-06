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