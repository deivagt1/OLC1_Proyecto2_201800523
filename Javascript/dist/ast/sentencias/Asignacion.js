"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const sentencia_1 = require("../sentencia");
class Asignacion extends sentencia_1.Sentencia {
    constructor(id, valor, line, column) {
        super(line, column);
        this.id = id;
        this.valor = valor;
    }
    translate() {
        return this.id + " = " + this.valor.translate() + ";\n";
    }
    generarGrafo(g, padre) {
        //Identificador
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.valor.generarGrafo(g, nombreHijo);
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "ASIGNACION";
    }
}
exports.Asignacion = Asignacion;
