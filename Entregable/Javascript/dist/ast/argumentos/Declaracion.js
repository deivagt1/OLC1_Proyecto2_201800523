"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class Declaracion extends sentencia_1.Sentencia {
    /**
     * @class La Sentencia declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(type, id, valor, line, column) {
        super(line, column);
        this.id = id;
        this.type = type;
        this.valor = valor;
    }
    translate() {
        return "var " + this.id + " = " + this.valor.translate() + ";\n";
    }
    generarGrafo(g, padre) {
        let padreAux = padre; //Auxiar con nombre del padre
        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + Tipo_1.Tipo[this.type] + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        // Id
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let padreHijo = nombreHijo;
        //Identificador
        nombreHijo = "nodo" + g.contador;
        /*let losIds = ""
        for(let i = 0; i<listaIds.length; i++){
            losIds += listaIds[i]+",";
        }
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + losIds + "\"];\n";
        */
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.valor != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.valor.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "DECLARACION";
    }
}
exports.Declaracion = Declaracion;
