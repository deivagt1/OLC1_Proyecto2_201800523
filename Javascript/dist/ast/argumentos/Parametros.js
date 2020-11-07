"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametros = void 0;
const sentencia_1 = require("../sentencia");
class Parametros extends sentencia_1.Sentencia {
    constructor(parametros, line, column) {
        super(line, column);
        this.parametros = parametros;
    }
    translate() {
        let cadena = "";
        for (const ins of this.parametros) {
            cadena += ins.translate();
            cadena += ",";
        }
        if (cadena != "") {
            cadena = cadena.slice(0, -1);
        }
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        for (let x = 0; x < this.parametros.length; x++) {
            let par = this.parametros[x];
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + par.getNombreHijo() + "\"];\n";
            g.salida += "  " + p + " -> " + nombreHijo + ";\n";
            g.contador++;
            par.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "PARAMETROS";
    }
}
exports.Parametros = Parametros;
