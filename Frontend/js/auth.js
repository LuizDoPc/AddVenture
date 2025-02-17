function localStorageExpires()
{
    var
        toRemove = [],                      //Itens para serem removidos
        currentDate = new Date().getTime(); //Data atual em milissegundos

    for (var i = 0, j = localStorage.length; i < j; i++) {
       var key = localStorage.key(i);
       var current = localStorage.getItem(key);

       //Verifica se o formato do item para evitar conflitar com outras aplicações
       if (current && /^\{(.*?)\}$/.test(current)) {

            //Decodifica de volta para JSON
            current = JSON.parse(current);

            //Checa a chave expires do item especifico se for mais antigo que a data atual ele salva no array
            if (current.expires && current.expires <= currentDate) {
                toRemove.push(key);
            }
       }
    }

    // Remove itens que já passaram do tempo
    // Se remover no primeiro loop isto poderia afetar a ordem,
    // pois quando se remove um item geralmente o objeto ou array são reordenados
    for (var i = toRemove.length - 1; i >= 0; i--) {
        localStorage.removeItem(toRemove[i]);
    }

};

localStorageExpires();//Auto executa a limpeza

//Declare isto
function setLocalStorage(chave, valor, minutos)
{
    var expirarem = (new Date().getTime()) + (60000 * minutos);

    localStorage.setItem(chave, JSON.stringify({
        "value": valor,
        "expires": expirarem
    }));
}

function removeStorage (chave) {
    localStorage.removeItem(chave);
}


function startSession (data=false, expireTime=30) {
  if (data) {
    setLocalStorage('token', data['token'], expireTime);
    setLocalStorage('user', data['user'], expireTime);
    return true;
  }

  return false;
}


function unsetSession () {
    removeStorage('token');
    removeStorage('user');
}


function getSession(chave)
{
    localStorageExpires();//Limpa itens

    var itemValue = localStorage[chave];

    if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {

        //Decodifica de volta para JSON
        var current = JSON.parse(itemValue);

        return current.value;
    }

    return false;
}


function updateSession () {
    if (hasToken())
        startSession({'token': getSession('token'), 'user': getSession('user')})
}


function hasToken () {
  return getSession('token');
}


function restrictLoggedOut (redirectTo) {
    updateSession();

    if(!hasToken() && !getSession('token')) {
        window.location.replace(redirectTo+".html");
    }
}


function restrictLoggedIn (redirectTo, userAllow=null) {
    updateSession();

    if(hasToken() && getSession('token') && (userAllow !== getSession('user')['user_type'])) {
        window.location.replace(redirectTo+".html");
    }
}


var restrictions = [];

function newRestrict (page='', redirectToIfLoggedOut=null, redirectToIfLoggedIn=null, userAllow=null){
    restrictions[page] = {'out':redirectToIfLoggedOut, 'in':redirectToIfLoggedIn, 'userAllow':userAllow};
}


newRestrict('', 'login', 'home');

newRestrict('index', 'login', 'home');

newRestrict('login', null, 'home');

newRestrict('home', 'index');

newRestrict('include/aventura', '../login');

newRestrict('include/cadastrar.aventura', '../login', '../home', 0);

newRestrict('include/editar.aventura', '../login', '../home', 0);

newRestrict('include/home.aventureiro', '../login', '../home', 1);

newRestrict('include/home.guia', '../login', '../home', 0);

newRestrict('include/minhas.inscricoes', '../login', '../home', 1);

function checkAuth () {
    var page = window.location.href.split('html/').pop().split('.html')[0];
   
    if (page in restrictions) {
        var restriction = restrictions[page];

        if (restriction['out'] != null)
            restrictLoggedOut(restriction['out']);
        
        if (restriction['in'] != null)
            restrictLoggedIn(restriction['in'], restriction['userAllow'])
    }

    if (window.location.href.split('html/').pop().includes('?page=')) {
        var include = "include/"+window.location.href.split('html/').pop().split('page=')[1].split('&')[0];

        if (include in restrictions) {
            var restriction = restrictions[include];
    
            if (restriction['out'] != null)
                restrictLoggedOut(restriction['out'].split('../')[1]);
            
            if (restriction['in'] != null)
                restrictLoggedIn(restriction['in'].split('../')[1], restriction['userAllow'])
        }
    }
    
}

checkAuth();