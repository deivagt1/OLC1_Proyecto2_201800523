"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaMetodo = void 0;
const sentencia_1 = require("../sentencia");
class LlamadaMetodo extends sentencia_1.Sentencia {
    constructor(id, parametros, line, column) {
        super(line, column);
        this.id = id;
        this.parametros = parametros;
    }
    translate() {
        let cadena = this.id + "(";
        for (const par of this.parametros) {
            cadena += par.translate();
        }
        cadena = cadena.slice(0, -2);
        cadena += ");\n";
        return cadena;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"Nombre\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let p = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"(\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"PARAMETROS\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        for (let x = 0; x < this.parametros.length; x++) {
            let par = this.parametros[x];
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + par.getNombreHijo() + "\"];\n";
            g.salida += "  " + p + " -> " + nombreHijo + ";\n";
            g.contador++;
            par.generarGrafo(g, nombreHijo);
        }
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\")\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "LLAMADAMETODO";
    }
}
exports.LlamadaMetodo = LlamadaMetodo;
