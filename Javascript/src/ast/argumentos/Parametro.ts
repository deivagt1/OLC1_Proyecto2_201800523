import { Sentencia } from  "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";
import { Tipo } from "../Tipo";

export class Parametro extends Sentencia {
    
    identificador: String;
    tipo: Tipo;
   
    constructor(tipo:Tipo, identificador:String, line:Number, column:Number){
        super(line,column);
        this.tipo = tipo;
        this.identificador = identificador;
       
    }

    translate() {
        let cadena = this.identificador + ", ";
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p = padre;
        let nombreHijo = "nodo"+g.contador;
        if(this.tipo != null){
            g.salida += "  "+nombreHijo +"[label=\"TIPO\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;        
            p = nombreHijo;
    
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+Tipo[this.tipo]+"\"];\n";
            g.salida += "  "+p +" -> "+ nombreHijo+";\n";
            g.contador++;   
        }
       

        // Id
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        p = nombreHijo;

        //Identificador
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.identificador + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
       
     
        return null;
    }
    
    getNombreHijo(): String {
        return "PARAMETRO";
    }
}