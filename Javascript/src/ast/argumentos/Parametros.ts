import { Sentencia } from  "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";
import { Tipo } from "../Tipo";
import {Parametro} from "./Parametro";

export class Parametros extends Sentencia {
    
    parametros: Array<Parametro>;
      
    constructor( parametros: Array<Parametro>, line:Number, column:Number){
        super(line,column);
        this.parametros = parametros;
      }

    translate() {
        let cadena = "";

        for (const ins of this.parametros) {
            cadena += ins.translate();
            cadena +=","
        }

        if(cadena != ""){
            cadena = cadena.slice(0,-1);
        }        
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p = padre;
        
        
        //----------- LISTA DE PARAMETROS -----------
        let nombreHijo = "nodo"+g.contador;
        

        for (let x = 0; x < this.parametros.length; x++) {
            let par = this.parametros[x];
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+par.getNombreHijo()+"\"];\n";
            g.salida += "  "+p +" -> "+ nombreHijo+";\n";
            g.contador++;
            par.generarGrafo(g,nombreHijo);
        }

        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "PARAMETROS";
    }
}