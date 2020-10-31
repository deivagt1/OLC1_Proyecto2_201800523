import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";
import { Parametros  } from "../argumentos/Parametros";

export class LlamadaMetodo extends Sentencia {
    id:String;
    parametros: Array<Parametros>;

    
    
    constructor(id:String,parametros: Array<Parametros>, line:Number, column:Number){
        super(line,column)  
        this.id = id;
        this.parametros = parametros;
    }

    translate() {     
        let cadena =this.id+"(";

        for (const par of this.parametros) {
            cadena += par.translate();
        }     
        
        cadena = cadena.slice(0,-2);

        cadena += ");\n";
        return cadena;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        
        
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"Nombre\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        let p = nombreHijo;
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.id+"\"];\n";
        g.salida += "  "+p +" -> "+ nombreHijo+";\n";
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


        
        return null;
    }
    getNombreHijo(): String {
        return "LLAMADAMETODO";
    }
}