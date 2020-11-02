"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullAsig = void 0;
const sentencia_1 = require("../../sentencia");
class FullAsig extends sentencia_1.Sentencia {
    constructor(id, valor, line, column) {
        super(line, column);
        this.id = id;
        this.valor = valor;
    }
    translate() {
        return this.id + " = " + this.valor.translate() + " , ";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.valor.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        return "FullAsignacion";
    }
}
exports.FullAsig = FullAsig;
