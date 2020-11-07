"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const sentencia_1 = require("../sentencia");
class Identificador extends sentencia_1.Sentencia {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    translate() {
        return this.id;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "IDENTIFICADOR";
    }
}
exports.Identificador = Identificador;
