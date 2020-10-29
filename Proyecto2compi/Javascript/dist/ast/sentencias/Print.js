"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const sentencia_1 = require("../sentencia");
class Print extends sentencia_1.Sentencia {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    translate() {
        return "imprimir(" + this.expresion.translate() + ");\n";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.expresion.getNombreHijo() + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.expresion.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        return "PRINT";
    }
}
exports.Print = Print;
