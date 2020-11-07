
const fileSelector = document.getElementById('archivoEntrada');

fileSelector.addEventListener('change', (event) => { 
    var file = event.target.files[0];
    if (!file) {
      return;
    }    
    var reader = new FileReader();
    reader.onload = function(event) {
      var contenido = event.target.result;
      document.getElementById('textoEntrada').value = contenido; 
    };
    
    reader.readAsText(file);
});