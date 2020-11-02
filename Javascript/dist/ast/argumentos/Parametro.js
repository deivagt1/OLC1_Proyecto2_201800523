"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametro = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class Parametro extends sentencia_1.Sentencia {
    constructor(tipo, identificador, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.identificador = identificador;
    }
    translate() {
        let cadena = this.identificador + ", ";
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"TIPO\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + Tipo_1.Tipo[this.tipo] + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        // Id
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        //Identificador
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.identificador + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PARAMETRO";
    }
}
exports.Parametro = Parametro;
