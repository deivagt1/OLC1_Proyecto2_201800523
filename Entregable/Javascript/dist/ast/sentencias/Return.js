"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const sentencia_1 = require("../sentencia");
class Return extends sentencia_1.Sentencia {
    constructor(valor, expresion, line, column) {
        super(line, column);
        this.valor = valor;
        this.expresion = expresion;
    }
    translate() {
        return this.valor + " " + this.expresion.translate() + ";\n";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"return\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"EXPRESION\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.expresion.generarGrafo(g, nombreHijo);
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "RETURN";
    }
}
exports.Return = Return;
