"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionLogica = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class OperacionLogica extends sentencia_1.Sentencia {
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.AND:
                return this.operador1.translate() + " && " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.OR:
                return this.operador1.translate() + " || " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.XOR:
                return this.operador1.translate() + " ^ " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.NOT:
                return " !" + this.operador1.translate();
        }
        return "";
    }
    generarGrafo(g, padre) {
        if (this.tipoOperacion == Tipo_1.TipoDeOperacion.NOT) {
            let nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + this.SimboloOperacion() + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.operador1.getNombreHijo() + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.operador1.generarGrafo(g, nombreHijo);
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.SimboloOperacion() + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.operador2 != null) {
            //Operador2
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.AND:
                return "AND";
            case Tipo_1.TipoDeOperacion.OR:
                return "OR";
            case Tipo_1.TipoDeOperacion.XOR:
                return "XOR";
            case Tipo_1.TipoDeOperacion.NOT:
                return "NOT";
            default:
                return "";
        }
    }
    SimboloOperacion() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.AND:
                return "&&";
            case Tipo_1.TipoDeOperacion.OR:
                return "||";
            case Tipo_1.TipoDeOperacion.NOT:
                return "!";
            case Tipo_1.TipoDeOperacion.XOR:
                return "^";
            default:
                return "";
        }
    }
}
exports.OperacionLogica = OperacionLogica;
