"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parentesis = void 0;
const sentencia_1 = require("../sentencia");
class Parentesis extends sentencia_1.Sentencia {
    /**
     * @class
     * @param line
     * @param column
     * @param operador1
     */
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    translate() {
        return "(" + this.expresion.translate() + ")";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"(\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"EXPRESION\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.expresion.generarGrafo(g, nombreHijo);
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\")\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PARENTESIS";
    }
}
exports.Parentesis = Parentesis;
