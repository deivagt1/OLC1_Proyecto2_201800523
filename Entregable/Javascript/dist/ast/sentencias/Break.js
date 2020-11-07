"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const sentencia_1 = require("../sentencia");
class Break extends sentencia_1.Sentencia {
    constructor(valor, line, column) {
        super(line, column);
        this.valor = valor;
    }
    translate() {
        return this.valor + ";\n";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"Break\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "BREAK";
    }
}
exports.Break = Break;
