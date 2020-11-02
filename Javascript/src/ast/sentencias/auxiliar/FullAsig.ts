import { Sentencia } from "../../sentencia"
import { ValorGrafo } from "../../grafo/ValorGrafo";

export class FullAsig extends Sentencia {
    id:String;
    valor:Sentencia;
    
    constructor(id:String, valor:Sentencia, line:Number, column:Number){
        super(line,column)
        this.id = id;
        this.valor = valor;
    }

    translate() {
        return this.id + " = " + this.valor.translate() + " , ";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\" Id: "+this.id+"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.valor.getNombreHijo()+"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.valor.generarGrafo(g,nombreHijo);
        
        return null;
    }
    getNombreHijo(): String {
        return "FullAsignacion";
    }
}