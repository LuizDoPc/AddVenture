
checkAuth();

$(document).ready(function(){
  $("#login").submit(function(e){
    let login_data = new FormData(this);
    let self = this;
    
    errorFormShow(false, this);
    loadingFormShow(this);

    $.ajax({
      type: "POST",
      url: "http://localhost:4444/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(Object.fromEntries(login_data)),
      success: function(res) {
        startSession(res);
        checkAuth();
        loadingFormShow(self, false);
      },
      error: function(xhr, status, error) {
        loadingFormShow(self, false);
        switch (xhr.status) {
          case 404:
              errorFormShow(true, self, 'Usuário ou senha incorreta.');
            break;

          case 401:
              errorFormShow(true, self, 'Usuário ou senha incorreta.');
            break;

          case 400:
              errorFormShow(true, self, 'Os dois campos são obrigatórios.');
            break;
          
          default:
            errorFormShow(true, self, 'Ocorreu um erro. Tente novamente!');
            break;

        }
      }
    })


    e.preventDefault();
    return false;
  });

})