import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Primitivo extends Sentencia {
    valor:any;
    tipo:number;
 
    constructor(tipo:number, valor:any, line:Number, column:Number){
        super(line,column)
        this.valor = valor;
        this.tipo = tipo;
    }

    translate() {
        return this.valor;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let temp =this.valor.toString()
        

        if(this.tipo ==1){
            temp = temp.slice(1,-1);
 
        }
    

        let nombreHijo = "nodo"+g.contador;     
        g.salida += "  "+nombreHijo +"[label=\""+ temp +"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        return null;
    }
    getNombreHijo(): String {
        return "PRIMITIVO";
    }
}