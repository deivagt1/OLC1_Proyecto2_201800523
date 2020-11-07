import { Sentencia } from "../sentencia";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Parentesis extends Sentencia {
    expresion:Sentencia;

    constructor(expresion:Sentencia, line:Number, column:Number){
        super(line,column)
        this.expresion = expresion;  
    }

    translate() {
        
        return "(" + this.expresion.translate() + ")";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
    
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;     
        

  
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"EXPRESION\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
              
        this.expresion.generarGrafo(g, nombreHijo);

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\")\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;     
        
        return null;
        
    }
    getNombreHijo(): String {
       return "PARENTESIS";
    }

   
}