import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Asignacion extends Sentencia {
    id:String;
    valor:Sentencia;
  
    constructor(id:String, valor:Sentencia, line:Number, column:Number){
        super(line,column)
        this.id = id;
        this.valor = valor;
    }

    translate() {

     
        return this.id + " = " + this.valor.translate() + ";\n";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        //Identificador
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\" Id: "+this.id+"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.valor.getNombreHijo()+"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.valor.generarGrafo(g,nombreHijo);

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\";\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        
        return null;
    }
    getNombreHijo(): String {
        return "ASIGNACION";
    }
}