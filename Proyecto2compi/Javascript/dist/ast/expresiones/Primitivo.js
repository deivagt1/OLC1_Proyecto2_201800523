"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const sentencia_1 = require("../sentencia");
class Primitivo extends sentencia_1.Sentencia {
    /**
     * @class La clase Primitivo almacena el valor real (numero|cadena|booleano)
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param valor valor real
     */
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
