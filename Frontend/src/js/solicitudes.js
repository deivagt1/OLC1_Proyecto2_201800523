function Analizar(){
    var url = 'http://localhost:3000/analizar';
    var data = {codigo: 'codigo'};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(function(error) {
        alert(error);
    })
    .then(function(response) {
        //var win = window.open("./jstree/index.html?id="+response,'_blank');
        alert(response);
    });

}