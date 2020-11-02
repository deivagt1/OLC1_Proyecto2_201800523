import { Sentencia } from  "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";
import { Tipo } from "../Tipo";
import { Parametros } from "./Parametros";

export class DeclFuncion extends Sentencia {
    
    sentencias: Array<Sentencia>;
    nombreFuncion: String;
    parametros: Array<Parametros>;
    tiporetorno: Tipo;
   
    constructor(tiporetorno:Tipo, nombreFuncion:String, parametros:Array<Parametros>, line:Number, column:Number){
        super(line,column);
        this.tiporetorno = tiporetorno;
 
        this.nombreFuncion = nombreFuncion;
        this.parametros = parametros;
    }

    translate() {
        let cadena ="function " + this.nombreFuncion+"(";

        for (const par of this.parametros) {
            cadena += par.translate();
        } 
        cadena = cadena.slice(0,-2);
        cadena += ");\n";
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p = padre;

        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"TIPO RETORNO\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;        
        p = nombreHijo;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+Tipo[this.tiporetorno]+"\"];\n";
        g.salida += "  "+p +" -> "+ nombreHijo+";\n";
        g.contador++;   
       
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        p = nombreHijo;

     
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.nombreFuncion + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
       
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"PARAMETROS\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   
        p = nombreHijo;

    
        for (let x = 0; x < this.parametros.length; x++) {
            let par = this.parametros[x];
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+par.getNombreHijo()+"\"];\n";
            g.salida += "  "+p +" -> "+ nombreHijo+";\n";
            g.contador++;
            par.generarGrafo(g,nombreHijo);
        }

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\")\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\";\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "DECLARACIONFUNCION";
    }
}