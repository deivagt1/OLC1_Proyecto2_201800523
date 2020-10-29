"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.tok = void 0;
class tok {
    constructor(fila, columna, tipo, descripcion) {
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
}
exports.tok = tok;
class Token extends tok {
    constructor(fila, columna, tipo, descripcion) {
        super(fila, columna, tipo, descripcion);
    }
    getfila() {
        return this.fila;
    }
    getcolumna() {
        return this.columna;
    }
    gettipo() {
        return this.tipo;
    }
    getdescripcion() {
        return this.descripcion;
    }
    setfila(fila) {
        this.fila = fila;
    }
    setcolumna(columna) {
        this.columna = columna;
    }
    settipo(tipo) {
        this.tipo = tipo;
    }
    setdescripcion(descripcion) {
        this.descripcion = descripcion;
    }
}
exports.Token = Token;
