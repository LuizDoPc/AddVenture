pageUnauthorized('index.html', false);

function validarCpf (cpf) {
  cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

function validarCnpj(cnpj) {
 
  cnpj = cnpj.replace(/[^\d]+/g,'');

  if(cnpj == '') return false;
   
  if (cnpj.length != 14)
      return false;

  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" || 
      cnpj == "11111111111111" || 
      cnpj == "22222222222222" || 
      cnpj == "33333333333333" || 
      cnpj == "44444444444444" || 
      cnpj == "55555555555555" || 
      cnpj == "66666666666666" || 
      cnpj == "77777777777777" || 
      cnpj == "88888888888888" || 
      cnpj == "99999999999999")
      return false;
       
  // Valida DVs
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0,tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
      return false;
       
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
          pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
        return false;
         
  return true;
  
}

$(document).ready(function(){  
  var telMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  telOptions = {
    onKeyPress: function(val, e, field, options) {
        field.mask(telMaskBehavior.apply({}, arguments), options);
      }
  };

  $('.tel').mask(telMaskBehavior, telOptions);
  $('.cnpj').mask('00.000.000/0000-00');
  $('.cpf').mask('000.000.000-00');
  $('#cadastrar').submit(function(e){
    let self = this;
    let dados = new FormData(self);


    errorFormShow(false, self);
    loadingFormShow(self);

    dados.set('document', dados.get('document').replace(/[^0-9]/g, ''));
    dados.set('phone', dados.get('phone').replace(/[^0-9]/g, ''));

    switch (dados.get('user_type')) {
      case "0":
        if(!validarCnpj(dados.get('document'))) {
          errorFormShow (true, '.cnpj', 'CNPJ inválido!', true);
          return false;
        }
        break;

      case "1":
        if(!validarCpf(dados.get('document'))) {
          errorFormShow (true, '.cpf', 'CPF inválido!', true);
          return false;
        }
        break;
    }

    if (dados.get('password') != dados.get('confirm-password')) {
      errorFormShow (true, '#password', 'Senhas estão diferentes!', true);
      return false;
    }
    dados.delete('confirm-password');

    if (dados.get('phone').length < 10) {
      errorFormShow (true, '#phone', 'Telefone inválido!', true);
      return false;
    }
    console.log('1')

    $.ajax({
      type: "POST",
      url: "http://localhost:4444/users",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(Object.fromEntries(dados)),
      success: function(res) {
        msgFormPopUp(self, true, '<p class="h1 mb-0"><b>'+res.name.split(' ')[0]+',</b></p><p class="h4 mb-3">seu cadastro foi efetuado com sucesso!</p>\
        <p><a class="btn btn-primary" href="login.html">Ir para página de login</a></p>');
        loadingFormShow(self, false);
      },
      error: function(xhr, status, error) {
        console.log('3')
        errorFormShow (true, self, 'Erro inexperado. Tente novamente!');
      }
    })


    e.preventDefault();
    return false;

  });

});