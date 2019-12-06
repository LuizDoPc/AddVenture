pageUnauthorized('login.html');

if (hasToken()) {
  switch (getLocalStorage('user')['user_type']) {
    case 0:
      window.location.replace('home.guia.html');
      break;

    case 1:
      window.location.replace('home.aventureiro.html');
      break;
  }
}
$(document).ready(function() {

});