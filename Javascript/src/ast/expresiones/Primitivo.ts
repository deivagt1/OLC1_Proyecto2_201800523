import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Primitivo extends Sentencia {
    valor:any;
 
    constructor(valor:any, line:Number, column:Number){
        super(line,column)
        this.valor = valor;
    }

    translate() {
        return this.valor;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+ this.valor.toString() +"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        return null;
    }
    getNombreHijo(): String {
        return "PRIMITIVO";
    }
}