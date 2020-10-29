import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Return extends Sentencia {
    valor:String;
    expresion: Sentencia;
   
    constructor(valor:String, expresion:Sentencia, line:Number, column:Number){
        super(line,column)  
        this.valor = valor;
        this.expresion = expresion;
    }

    translate() {     
        return this.valor + " "+ this.expresion.translate() + ";\n";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"return\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"EXPRESION\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        this.expresion.generarGrafo(g,nombreHijo);

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\";\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        return null;
    }
    getNombreHijo(): String {
        return "RETURN";
    }
}