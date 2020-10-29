import { Sentencia } from  "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Main extends Sentencia {
    
    sentencias: Array<Sentencia>;
    main: String;
   
    constructor(main:String, sentencias: Array<Sentencia>, line:Number, column:Number){
        super(line,column);
        this.sentencias = sentencias;
        this.main = main;
    }

    translate() {
        let cadena = this.main+"(){\n";
        for (const ins of this.sentencias) {
            cadena += ins.translate();
        }
        return cadena+"\n}\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p = padre;
       
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"public\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;        

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"static\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;       

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"void\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;      

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"main\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
       
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"String\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"[\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"]\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"args\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\")\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"{\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        
       
        
        //----------- LISTA DE SENTENCIAS -----------
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.sentencias.length; x++) {
            let sent = this.sentencias[x];
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+sent.getNombreHijo()+"\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            sent.generarGrafo(g,nombreHijo);
        }

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"}\"];\n";
        g.salida += "  "+p +" -> "+ nombreHijo+";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "MAIN";
    }
}