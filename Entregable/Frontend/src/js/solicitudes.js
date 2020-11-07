
var traduccion;
var tokens;
var errores;

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
      //let a = [{'analisis': nuevoCodigo}, {'grafo':textoDot},{'tokens': listadodeTokens}, {'errores': listadodeErrores }]
        document.getElementById("textoSalida").value = response[3].errores;
        traduccion = response[0].analisis;
        tokens = response[2].tokens;
        errores = response[3].errores;

        d3.select("#graph").graphviz()
        .width(window.width - 25)
        .height(900)
        .fit(true)
        .renderDot(response[1].grafo);
     
      
        
    });

}


function descargarTokens() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(tokens));
  element.setAttribute('download', "listadoTokens.txt");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function descargarErrores() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(errores));
  element.setAttribute('download', "listadoErrores.txt");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function descargarTraduccion() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(traduccion));
  element.setAttribute('download', "TraduccionJS.js");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function descargarTraduccion() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(traduccion));
  element.setAttribute('download', "TraduccionJS.js");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function guardar() {
  var entradaActual =  document.getElementById("textoEntrada").value;
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(entradaActual));
  element.setAttribute('download', "guardado.java");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function selElement(elem) {	
	var eventMouse = document.createEvent("MouseEvents")
	eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	elem.dispatchEvent(eventMouse)
}
function abrirArchivo(func) {
	readFile = function(e) {
		var file = e.target.files[0];
		if (!file) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			fileInput.func(contents)
			document.body.removeChild(fileInput)
		}
		reader.readAsText(file)
	}
	fileInput = document.createElement("input")
	fileInput.type='file'
	fileInput.style.display='none'
	fileInput.onchange=readFile
	fileInput.func=func
	document.body.appendChild(fileInput)
	selElement(fileInput)
}