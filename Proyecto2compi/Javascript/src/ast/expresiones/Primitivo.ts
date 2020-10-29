import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Primitivo extends Sentencia {
    valor:any;
    /**
     * @class La clase Primitivo almacena el valor real (numero|cadena|booleano)
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param valor valor real
     */
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