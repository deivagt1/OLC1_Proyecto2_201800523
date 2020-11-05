"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaErrores = exports.ListaToken = exports.errorTokens = exports.tokens = void 0;
exports.tokens = new Array();
exports.errorTokens = new Array();
class ListaToken {
    constructor() {
    }
    generar() {
        let cadena = "";
        for (let i = 0; i < exports.tokens.length; i++) {
            let tok = exports.tokens[i];
            cadena += "Fila: " + tok.fila + " | Columna: " + tok.columna + " | Tipo: " + tok.tipo + " | Descripcion: " + tok.descripcion + "\n";
        }
        return cadena;
    }
}
exports.ListaToken = ListaToken;
class ListaErrores {
    constructor() {
    }
    generar() {
        let cadena = "";
        for (let i = 0; i < exports.errorTokens.length; i++) {
            let err = exports.errorTokens[i];
            cadena += "Fila: " + err.fila + " | Columna: " + err.columna + " | Tipo: " + err.tipo + " | Descripcion: " + err.descripcion + "\n";
        }
        return cadena;
    }
}
exports.ListaErrores = ListaErrores;
