function Analizar(){
    var codigo1 = document.getElementById("textoEntrada").value;
    
    var url = 'http://localhost:3000/analizar';
    var data = {codigo: codigo1};
    
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
        console.log(response[0].analisis);
        document.getElementById("textoSalida").value = response[0].analisis;

        d3.select("#graph").graphviz()
        .width(window.width - 25)
        .height(900)
        .fit(true)
        .renderDot(response[1].grafo);
      
        
    });

}

