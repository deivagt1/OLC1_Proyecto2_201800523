"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const sentencia_1 = require("../sentencia");
class Primitivo extends sentencia_1.Sentencia {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    translate() {
        return this.valor;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.valor.toString() + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PRIMITIVO";
    }
}
exports.Primitivo = Primitivo;
