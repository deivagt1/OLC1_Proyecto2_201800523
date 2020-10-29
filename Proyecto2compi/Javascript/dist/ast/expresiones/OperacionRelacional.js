"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionRelacional = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class OperacionRelacional extends sentencia_1.Sentencia {
    /**
     * @class
     * @param line
     * @param column
     * @param operador1
     * @param operador2
     * @param tipoOperacion
     */
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.MAYOR:
                return this.operador1.translate() + " > " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.MENOR:
                return this.operador1.translate() + " < " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.MAYORIGUAL:
                return this.operador1.translate() + " >= " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.MENORIGUAL:
                return this.operador1.translate() + " <= " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.DOSIGUAL:
                return this.operador1.translate() + " == " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.DISTINTO:
                return this.operador1.translate() + " != " + this.operador2.translate();
        }
        return "";
    }
    generarGrafo(g, padre) {
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
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.MAYOR:
                return "MAYOR";
            case Tipo_1.TipoDeOperacion.MENOR:
                return "MENOR";
            case Tipo_1.TipoDeOperacion.MAYORIGUAL:
                return "MAYORIGUAL";
            case Tipo_1.TipoDeOperacion.MENORIGUAL:
                return "MENORIGUAL";
            case Tipo_1.TipoDeOperacion.DOSIGUAL:
                return "DOBLEIGUAL";
            case Tipo_1.TipoDeOperacion.DISTINTO:
                return "DISTINTO";
            default:
                return "";
        }
    }
    SimboloOperacion() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.MAYOR:
                return ">";
            case Tipo_1.TipoDeOperacion.MENOR:
                return "<";
            case Tipo_1.TipoDeOperacion.MAYORIGUAL:
                return ">=";
            case Tipo_1.TipoDeOperacion.MENORIGUAL:
                return "<=";
            case Tipo_1.TipoDeOperacion.DOSIGUAL:
                return "==";
            case Tipo_1.TipoDeOperacion.DISTINTO:
                return "!=";
            default:
                return "";
        }
    }
}
exports.OperacionRelacional = OperacionRelacional;
