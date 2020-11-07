import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";
import { ListaErrores, ListaToken, tokens, errorTokens } from './ListaToken';
import { Token } from './Token';

export function AnalizarJava(entrada:string){

    tokens.splice(0,tokens.length);
	errorTokens.splice(0,errorTokens.length);


    let codigo = entrada; 

    let ast = Gramatica.parse(codigo) as AST;


    let lt = new ListaToken(); 
    let listadodeTokens = lt.generar();

    let le = new ListaErrores();
    let listadodeErrores= le.generar();  
    

    let nuevoCodigo = ast.translate();
    

    let grafo = new GrafoAST(ast);
    let textoDot = grafo.getGrafo()
  


    let a = [{'analisis': nuevoCodigo}, {'grafo':textoDot},{'tokens': listadodeTokens}, {'errores': listadodeErrores }]
    return a;
}

