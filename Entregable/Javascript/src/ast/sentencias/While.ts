import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class While extends Sentencia {
    condicion:Sentencia;
    sentencias: Array<Sentencia>;
    
    constructor(condicion:Sentencia, sentencias: Array<Sentencia>, line:Number, column:Number){
        super(line,column);
        this.condicion = condicion;
        this.sentencias = sentencias;
    }

    translate() {
        let cadena = "while("+this.condicion.translate()+"){\n";
        for (const ins of this.sentencias) {
            cadena += ins.translate();
        }
        return cadena+"\n}\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        
       
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"while\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;        
        
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.condicion.getNombreHijo()+"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.condicion.generarGrafo(g,nombreHijo);

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\")\"];\n";
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
        return null;
    }
    
    getNombreHijo(): String {
        return "WHILE";
    }
}