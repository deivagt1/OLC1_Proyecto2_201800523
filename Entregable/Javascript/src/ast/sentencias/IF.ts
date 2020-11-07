import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";
import {Else} from "./Else";

export class IF extends Sentencia {
    condicion:Sentencia;
    sentencias: Array<Sentencia>;
    Else:Else;   
    
    constructor(condicion:Sentencia,sentencias:Array<Sentencia>,Else:Else, line:Number, column:Number){
        super(line,column)  
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.Else = Else;
    }

    translate() {     
        let cadena = "if(" + this.condicion.translate() +")\n{\n";
        for (const ins of this.sentencias) {
            cadena += ins.translate();
        }
        cadena += "}\n";

        if(this.Else != null){
            cadena += this.Else.translate();
        }else{
            cadena +="\n";
        }
        


        return cadena;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"if\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.condicion.getNombreHijo()+"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.condicion.generarGrafo(g,nombreHijo);

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\")\"];\n";
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
    
        if(this.Else != null){
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+this.Else.getNombreHijo()+"\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            this.Else.generarGrafo(g,nombreHijo);        
        }       
        
      
        return null;
    }
    getNombreHijo(): String {
        return "IF";
    }
}