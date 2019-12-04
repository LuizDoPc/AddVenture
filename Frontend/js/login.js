function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function tokenControl (request, token='') {
  $.ajax({
    type: "POST",
    url: "../php/token.php",
    data: {
      'request': request,
      'token': token
    },
    success: function(res) {
      console.log(res);
    }
  });
}

function loadingFormShow (form, show=true) {
  let loading = $(form).closest('.form-global').find('.loading');
  if (show) loading.css('display', 'flex');
  else loading.hide();
}

$(document).ready(function(){
  //TO DO se estiver logado, redireciona pra home
  //senão executa abaixo
  $("#login").submit(function(e){
    let login_data = new FormData(this);
    let self = this;
    loadingFormShow(this);

    $.ajax({
      type: "POST",
      url: "http://localhost:4444/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(Object.fromEntries(login_data)),
      success: function(res) {
        alert(res.token);  
        loadingFormShow(self, false);
      },
      error: function(xhr, status, error) {
        console.log(xhr.status);
        loadingFormShow(self, false);
      }
    })


    e.preventDefault();
    return false;
  });

})