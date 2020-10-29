import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class For extends Sentencia {
    declaracion:Sentencia;
    expresion1: Sentencia;
    expresion2: Sentencia;
    sentencias: Array<Sentencia>;
    

    
    constructor(declaracion:Sentencia, expresion1: Sentencia, expresion2: Sentencia, sentencias: Array<Sentencia>,line:Number, column:Number){
        super(line,column);
        this.declaracion = declaracion;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
        this.sentencias = sentencias;
    }

    translate() {
        let cadena = "for(";    
            cadena += this.declaracion.translate();

            cadena = cadena.slice(0,-2);
        
        cadena +="; "; 
            cadena += this.expresion1.translate();

       
        
        cadena +="; ";

            cadena += this.expresion2.translate();
        cadena = cadena.slice(0,-2);
        
        

        cadena +="){\n";

        for (const sent of this.sentencias) {
            cadena += sent.translate();
        }
                
        return cadena+"\n}\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;

        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"For\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\" (\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
              
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"DECLARACION\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        p = nombreHijo;
        this.declaracion.generarGrafo(g,p); 

        
                      
          
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"EXPRESION\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        p = nombreHijo;
        this.expresion1.generarGrafo(g,p);           
         

        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"EXPRESION\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        p = nombreHijo;
        this.expresion2.generarGrafo(g,p);           
        

        
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\")\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"{\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"SENTENCIAS\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        p = nombreHijo;

        for (let x = 0; x < this.sentencias.length; x++) {
            let decl = this.sentencias[x];
            decl.generarGrafo(g,p);           
        }
        
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;


        return null;
    }
    
    getNombreHijo(): String {
        return "FOR";
    }
}