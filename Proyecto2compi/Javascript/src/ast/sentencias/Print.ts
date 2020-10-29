import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo"

export class Print extends Sentencia {
    expresion:Sentencia;
    
    constructor(expresion:Sentencia, line:Number, column:Number){
        super(line,column)
        this.expresion = expresion;
    }

    translate() {
        return "imprimir("+this.expresion.translate()+");\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+ this.expresion.getNombreHijo() +"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.expresion.generarGrafo(g,nombreHijo);
        
        return null;
    }
    getNombreHijo(): String {
        return "PRINT";
    }

}