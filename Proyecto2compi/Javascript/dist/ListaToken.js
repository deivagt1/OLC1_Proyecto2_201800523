"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaToken = exports.tokens = void 0;
exports.tokens = new Array();
class ListaToken {
    constructor() {
    }
    imprimir() {
        for (let i = 0; i < exports.tokens.length; i++) {
            let tok = exports.tokens[i];
            console.log("Fila: " + tok.fila + " Columna: " + tok.columna + " Tipo: " + tok.tipo + " Descripcion: " + tok.descripcion);
        }
    }
}
exports.ListaToken = ListaToken;
