import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";
import { ListaErrores, ListaToken, tokens, errorTokens } from './ListaToken';
import { Token } from './Token';

export function AnalizarJava(entrada:string){

    tokens.splice(0,tokens.length);
	errorTokens.splice(0,errorTokens.length);


    let codigo = entrada; 


    console.log("\n\n---------------- INICIO ----------------\n");
    let ast = Gramatica.parse(codigo) as AST;

    //Listado de Token analizados
    let lt = new ListaToken();
    console.log("\n\n---------------- TOKENS ----------------\n");    
    let listadodeTokens = lt.generar();
    let le = new ListaErrores();
    console.log("\n\n---------------- ERRORES ----------------\n");
    let listadodeErrores= le.generar();
    console.log(listadodeErrores);
    
    //Traduccion
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST(ast);
    let textoDot = grafoAST.getGrafo()
    //console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(textoDot);

    //console.log("\n--------------------------------------------\n");
    let a = [{'analisis': nuevoCodigo}, {'grafo':textoDot},{'tokens': listadodeTokens}, {'errores': listadodeErrores }]
    return a;
}

