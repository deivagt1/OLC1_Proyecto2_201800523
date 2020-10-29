import { ValorGrafo } from "./grafo/ValorGrafo";
import { Argumento } from "./Argumento";
import {ListaToken }from "../ListaToken"

export class AST extends Argumento {
    
    argumentos: Array<Argumento>;
    listaErrores: Array<String>;
    listaPrints: Array<String>;
    listaToken:ListaToken;

    constructor(argumentos: Array<Argumento>){
        super(0,0)
        this.argumentos = argumentos;
    }

    translate():String {
        let cadena = "";
        for(let a = 0;a < this.argumentos.length; a++){
            cadena += this.argumentos[a].translate();
        }
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        
        let idHijo:String = "nodo"+g.contador;
        g.salida += "  "+idHijo +"[label=\"ARGUMENTOS\"];\n";
        g.salida += "  "+padre +" -> "+ idHijo+";\n";
        g.contador++;
        padre = idHijo;
        for (let i = 0; i < this.argumentos.length; i++) {
            let arg = this.argumentos[i];
            idHijo = "nodo"+g.contador;
            g.salida += "  "+idHijo +"[label=\""+arg.getNombreHijo()+"\"];\n";
            g.salida += "  "+padre +" -> "+ idHijo+";\n";
            g.contador++;
            arg.generarGrafo(g,idHijo);
        }
        //----------------------------------------------
    }
    getNombreHijo(): String {
        throw new Error("Metodo no implementado");
    }
}