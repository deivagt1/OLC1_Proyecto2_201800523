import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";
import {  IF  } from "./IF";

export class Else extends Sentencia {
  
    sentencias: Array<Sentencia>;   
    IF:IF;
    tipo:number;
    
    constructor(sentencias:Array<Sentencia>,IF:IF, tipo:number,line:Number, column:Number){
        super(line,column);        
        this.sentencias = sentencias;
        this.IF = IF;
        this.tipo = tipo;
    }

    translate() {
        let cadena = "";
        if (this.tipo == 0){//0 Else
            cadena += "else\n{\n";
            for (const ins of this.sentencias) {
                cadena += ins.translate();
            }
        cadena += "}\n";
        }else{//1 ELSE IF
            cadena += "\nelse " +this.IF.translate();
        }
        return cadena;
    }
    generarGrafo(g: ValorGrafo, padre: String) {

        if (this.tipo == 0){//0 Else
            let nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\"else\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
    
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\"{\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
    
    
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            let p = nombreHijo;
    
            for (let x = 0; x < this.sentencias.length; x++) {
                let sent = this.sentencias[x];
                nombreHijo = "nodo"+g.contador;
                g.salida += "  "+nombreHijo +"[label=\""+sent.getNombreHijo()+"\"];\n";
                g.salida += "  "+p +" -> "+ nombreHijo+";\n";
                g.contador++;
                sent.generarGrafo(g,nombreHijo);
            }
    
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\"}\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;

          
        
        }else{//1 ELSE IF
            
            let nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\"else\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;

            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+this.IF.getNombreHijo()+"\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            this.IF.generarGrafo(g,nombreHijo);        

        }
        

        return null;
    }
    getNombreHijo(): String {
        if (this.tipo == 0){//0 Else
           return "ELSE"
   
        }else{//1 ELSE IF
            return "ELSEIF";
        }
    }
}