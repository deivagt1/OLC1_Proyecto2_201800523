"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametro = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class Parametro extends sentencia_1.Sentencia {
    constructor(control, tipo, identificador, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.identificador = identificador;
        this.control = control;
    }
    translate() {
        let cadena = this.identificador + ", ";
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        if (this.tipo != null) {
            g.salida += "  " + nombreHijo + "[label=\"TIPO\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            p = nombreHijo;
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + Tipo_1.Tipo[this.tipo] + "\"];\n";
            g.salida += "  " + p + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        // Id
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        //Identificador
        let temp = this.identificador.toString();
        if (this.control == 1) {
            temp = temp.slice(1, -1);
        }
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + temp + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PARAMETRO";
    }
}
exports.Parametro = Parametro;
