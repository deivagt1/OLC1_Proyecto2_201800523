import { Sentencia } from "../sentencia"
import { Tipo } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";
import { MedAsig  } from "./auxiliar/MedAsig";
import { FullAsig } from "./auxiliar/FullAsig"

export class Declaracion extends Sentencia {
   
    valor: Array<Sentencia>;
    type: Tipo;

    
    constructor(type: Tipo,  valor: Array<Sentencia>, line: Number, column: Number) {
        super(line, column)
       
        this.type = type;
        this.valor = valor;
    }

    translate() {

        let cadena ="var ";

        for (const valores of this.valor){
            cadena += valores.translate();
        }

        cadena = cadena.slice(0,-3);

        cadena += ";\n";

        return cadena;



    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let p = padre;
        
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\" Tipo: " + Tipo[this.type] + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        if (this.valor != null) {
            for (let x = 0; x < this.valor.length; x++) {
                let par = this.valor[x];
                par.generarGrafo(g,p);

                nombreHijo = "nodo" + g.contador;
                if(x < this.valor.length-1){
                    g.salida += "  " + nombreHijo + "[label=\",\"];\n";
                    g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                }
                g.contador++;
                
            }
        }

        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;

        
        return null;


    }
    getNombreHijo(): String {
        return "DECLARACION"
    }
}