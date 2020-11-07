"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const sentencia_1 = require("../sentencia");
class Primitivo extends sentencia_1.Sentencia {
    constructor(tipo, valor, line, column) {
        super(line, column);
        this.valor = valor;
        this.tipo = tipo;
    }
    translate() {
        return this.valor;
    }
    generarGrafo(g, padre) {
        let temp = this.valor.toString();
        if (this.tipo == 1) {
            temp = temp.slice(1, -1);
        }
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + temp + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PRIMITIVO";
    }
}
exports.Primitivo = Primitivo;
