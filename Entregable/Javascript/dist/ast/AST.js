"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Argumento_1 = require("./Argumento");
class AST extends Argumento_1.Argumento {
    constructor(argumentos) {
        super(0, 0);
        this.argumentos = argumentos;
    }
    translate() {
        let cadena = "";
        for (let a = 0; a < this.argumentos.length; a++) {
            cadena += this.argumentos[a].translate();
        }
        return cadena;
    }
    generarGrafo(g, padre) {
        let idHijo = "nodo" + g.contador;
        g.salida += "  " + idHijo + "[label=\"ARGUMENTOS\"];\n";
        g.salida += "  " + padre + " -> " + idHijo + ";\n";
        g.contador++;
        padre = idHijo;
        for (let i = 0; i < this.argumentos.length; i++) {
            let arg = this.argumentos[i];
            idHijo = "nodo" + g.contador;
            g.salida += "  " + idHijo + "[label=\"" + arg.getNombreHijo() + "\"];\n";
            g.salida += "  " + padre + " -> " + idHijo + ";\n";
            g.contador++;
            arg.generarGrafo(g, idHijo);
        }
        //----------------------------------------------
    }
    getNombreHijo() {
        throw new Error("Metodo no implementado");
    }
}
exports.AST = AST;
