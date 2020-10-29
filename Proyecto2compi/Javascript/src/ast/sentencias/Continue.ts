import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Continue extends Sentencia {
    valor:String;
   
    
    constructor(valor:String, line:Number, column:Number){
        super(line,column)  
        this.valor = valor;
    }

    translate() {     
        return this.valor + ";\n";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"Continue\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\";\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        return null;
    }
    getNombreHijo(): String {
        return "CONTINUE";
    }
}