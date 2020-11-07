"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrafoAST = void 0;
const ValorGrafo_1 = require("./ValorGrafo");
class GrafoAST {
    constructor(arbol) {
        this.arbol = arbol;
    }
    getGrafo() {
        let salida = "digraph G{\n\n ";
        salida += "  nodo0[label=\"AST\"];\n";
        var g = new ValorGrafo_1.ValorGrafo(1, salida);
        this.arbol.generarGrafo(g, "nodo0");
        g.salida += "\n}";
        return g.salida;
    }
}
exports.GrafoAST = GrafoAST;
