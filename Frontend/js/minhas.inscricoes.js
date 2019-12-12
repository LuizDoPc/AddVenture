checkAuth();

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "http://localhost:4444/users/"+getSession('user')['id']+"/subscription",
    headers: {
      "Content-Type": "application/json"
    },
    data: "token="+getSession('token'),
    success: function(res) {
      aventuras = []
      res.forEach(function(aventura){
        aventura.adventure['categoria'] = aventura.adventure_type.description;
        aventuras.push(aventura.adventure);
      })
      displayAventuras(aventuras);
    }
  });
});