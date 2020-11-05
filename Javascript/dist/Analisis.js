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
    console.log("\n\n---------------- INICIO ----------------\n");
    let ast = Gramatica.parse(codigo);
    //Listado de Token analizados
    let lt = new ListaToken_1.ListaToken();
    console.log("\n\n---------------- TOKENS ----------------\n");
    let listadodeTokens = lt.generar();
    let le = new ListaToken_1.ListaErrores();
    console.log("\n\n---------------- ERRORES ----------------\n");
    let listadodeErrores = le.generar();
    //Traduccion
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let textoDot = grafoAST.getGrafo();
    //console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(textoDot);
    //console.log("\n--------------------------------------------\n");
    let a = [{ 'analisis': nuevoCodigo }, { 'grafo': textoDot }, { 'tokens': listadodeTokens }, { 'errores': listadodeErrores }];
    return a;
}
exports.AnalizarJava = AnalizarJava;
