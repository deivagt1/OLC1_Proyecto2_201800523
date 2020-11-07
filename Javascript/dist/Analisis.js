"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalizarJava = void 0;
const Gramatica = require("../Gramatica/gramatica");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
const ListaToken_1 = require("./ListaToken");
function AnalizarJava(entrada) {
    ListaToken_1.tokens.splice(0, ListaToken_1.tokens.length);
    ListaToken_1.errorTokens.splice(0, ListaToken_1.errorTokens.length);
    let codigo = entrada;
    let ast = Gramatica.parse(codigo);
    let lt = new ListaToken_1.ListaToken();
    let listadodeTokens = lt.generar();
    let le = new ListaToken_1.ListaErrores();
    let listadodeErrores = le.generar();
    let nuevoCodigo = ast.translate();
    let grafo = new GrafoAST_1.GrafoAST(ast);
    let textoDot = grafo.getGrafo();
    let a = [{ 'analisis': nuevoCodigo }, { 'grafo': textoDot }, { 'tokens': listadodeTokens }, { 'errores': listadodeErrores }];
    return a;
}
exports.AnalizarJava = AnalizarJava;
