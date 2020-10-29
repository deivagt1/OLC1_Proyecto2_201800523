"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionAritmetica = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class OperacionAritmetica extends sentencia_1.Sentencia {
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.SUMA:
                return this.operador1.translate() + " + " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.RESTA:
                return this.operador1.translate() + " - " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.MULTIPLICACION:
                return this.operador1.translate() + " * " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.DIVISION:
                return this.operador1.translate() + " / " + this.operador2.translate();
            case Tipo_1.TipoDeOperacion.INCREMENTO:
                return this.operador1.translate() + "++;\n";
            case Tipo_1.TipoDeOperacion.DECREMENTO:
                return this.operador1.translate() + "--;\n";
            case Tipo_1.TipoDeOperacion.NEGATIVO:
                return this.operador1.translate() + "-";
        }
        return "";
    }
    generarGrafo(g, padre) {
        if (this.tipoOperacion == Tipo_1.TipoDeOperacion.NEGATIVO) {
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
            case Tipo_1.TipoDeOperacion.SUMA:
                return "SUMA";
            case Tipo_1.TipoDeOperacion.RESTA:
                return "RESTA";
            case Tipo_1.TipoDeOperacion.MULTIPLICACION:
                return "MULTIPLICACION";
            case Tipo_1.TipoDeOperacion.DIVISION:
                return "DIVISION";
            case Tipo_1.TipoDeOperacion.INCREMENTO:
                return "INCREMENTO";
            case Tipo_1.TipoDeOperacion.DECREMENTO:
                return "DECREMENTO";
            case Tipo_1.TipoDeOperacion.NEGATIVO:
                return "NEGATIVO";
            default:
                return "MENOS_UNARIO";
        }
    }
    SimboloOperacion() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoDeOperacion.SUMA:
                return "+";
            case Tipo_1.TipoDeOperacion.RESTA:
                return "-";
            case Tipo_1.TipoDeOperacion.MULTIPLICACION:
                return "*";
            case Tipo_1.TipoDeOperacion.DIVISION:
                return "/";
            case Tipo_1.TipoDeOperacion.INCREMENTO:
                return "++";
            case Tipo_1.TipoDeOperacion.DECREMENTO:
                return "--";
            case Tipo_1.TipoDeOperacion.NEGATIVO:
                return "-";
            default:
                return "";
        }
    }
}
exports.OperacionAritmetica = OperacionAritmetica;
