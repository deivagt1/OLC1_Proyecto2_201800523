import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class DoWhile extends Sentencia {
    
    sentencias: Array<Sentencia>;
    condicion:Sentencia;
    
    constructor( sentencias: Array<Sentencia>,condicion:Sentencia, line:Number, column:Number){
        super(line,column);
        this.condicion = condicion;
        this.sentencias = sentencias;
    }

    translate() {
        let cadena = "do{\n";
        for (const sen of this.sentencias) {
            cadena += sen.translate();
        }

        cadena += "\n}while("+ this.condicion.translate()+");\n"
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
               
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"do\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"{\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;     

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++; 

        let p = nombreHijo;
        
        for (let x = 0; x < this.sentencias.length; x++) {
            let sent = this.sentencias[x];
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+sent.getNombreHijo()+"\"];\n";
            g.salida += "  "+p +" -> "+ nombreHijo+";\n";
            g.contador++;
            sent.generarGrafo(g,nombreHijo);
        }
        
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"}\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
      

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"while\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"CONDICION\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++; 

        p = nombreHijo;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.condicion.getNombreHijo()+"\"];\n";
        g.salida += "  "+p +" -> "+ nombreHijo+";\n";
        g.contador++;

        p = nombreHijo;
        
        this.condicion.generarGrafo(g,p);
        
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
        return "ELSE";
    }
}