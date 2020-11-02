"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const sentencia_1 = require("../sentencia");
class Asignacion extends sentencia_1.Sentencia {
    /**
     *  a = 5;
     * @class La Sentencia asignacion, modifica el valor de una variable en la tabla de simbolos
     * @param id identificador de la variable que se va a modificar
     * @param line linea donde se esata asignando el nuevo valor a la variable
     * @param column columna donde se esata asignando el nuevo valor a la variable
     * @param valor nuevo valor que se le asignara a la variable
     */
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
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.valor.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        return "ASIGNACION";
    }
}
exports.Asignacion = Asignacion;
