"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorGrafo = void 0;
class ValorGrafo {
    constructor(contador, salida) {
        this.contador = contador;
        this.salida = salida;
    }
    getContador() {
        return this.contador;
    }
    getGrafo() {
        return this.salida;
    }
    setContador(contador) {
        this.contador = contador;
    }
    setGrafo(grafo) {
        this.salida = grafo;
    }
}
exports.ValorGrafo = ValorGrafo;
