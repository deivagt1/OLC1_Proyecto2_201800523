import { Sentencia } from "../../sentencia"
import { ValorGrafo } from "../../grafo/ValorGrafo";

export class MedAsig extends Sentencia {
    id:String;
    Tipo:String;
 
    constructor(id:String, line:Number, column:Number){
        super(line,column)
        this.id = id;
        this.Tipo = "MA";
    }

    translate() {
        return this.id + " , ";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
   
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\" Id: "+this.id+"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
       
        
        return null;
    }
    getNombreHijo(): String {
        return "MediaAsignacion";
    }
}