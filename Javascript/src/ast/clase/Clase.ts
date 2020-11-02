import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Clase extends Sentencia {
    cosas: Array<Sentencia>;
    control: boolean;
    id: String;
    tipo: number;


    constructor(id: String, cosas: Array<Sentencia>, control: boolean, tipo: number, line: Number, column: Number) {
        super(line, column)
        this.cosas = cosas;
        this.control = control;
        this.id = id;
        this.tipo = tipo;
    }

    translate() {
        if (this.control == true) {
            let cadena = "class " + this.id + "{\n";
            for (const cosa of this.cosas) {
                cadena += cosa.translate();
            }
            cadena += "}\n";
            return cadena;
        }
        return "";
    }
    generarGrafo(g: ValorGrafo, padre: String) {

        if (this.control == true) {

            if (this.tipo == 0) {
                let nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"public\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;

                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"class\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;

                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;

                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"{\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;

                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
                let p = nombreHijo;
                for (let x = 0; x < this.cosas.length; x++) {
                    let cosa = this.cosas[x];
                    nombreHijo = "nodo" + g.contador;
                    g.salida += "  " + nombreHijo + "[label=\"" + cosa.getNombreHijo() + "\"];\n";
                    g.salida += "  " + p + " -> " + nombreHijo + ";\n";
                    g.contador++;
                    cosa.generarGrafo(g, nombreHijo);
                }


                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
            } else if (this.tipo == 1) {

                let nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"class\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;

                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;

                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"{\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;

                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
                let p = nombreHijo;
                for (let x = 0; x < this.cosas.length; x++) {
                    let cosa = this.cosas[x];
                    nombreHijo = "nodo" + g.contador;
                    g.salida += "  " + nombreHijo + "[label=\"" + cosa.getNombreHijo() + "\"];\n";
                    g.salida += "  " + p + " -> " + nombreHijo + ";\n";
                    g.contador++;
                    cosa.generarGrafo(g, nombreHijo);
                }


                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
                g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
                g.contador++;
            }

        } else if (this.tipo == 2) {

            let nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"public\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;

            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"interface\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;

            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;

            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"{\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;

            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            let p = nombreHijo;
            for (let x = 0; x < this.cosas.length; x++) {
                let cosa = this.cosas[x];
                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"" + cosa.getNombreHijo() + "\"];\n";
                g.salida += "  " + p + " -> " + nombreHijo + ";\n";
                g.contador++;
                cosa.generarGrafo(g, nombreHijo);
            }


            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        } else if (this.tipo == 3) {


            let nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"interface\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;

            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + this.id + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;

            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"{\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;

            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            let p = nombreHijo;
            for (let x = 0; x < this.cosas.length; x++) {
                let cosa = this.cosas[x];
                nombreHijo = "nodo" + g.contador;
                g.salida += "  " + nombreHijo + "[label=\"" + cosa.getNombreHijo() + "\"];\n";
                g.salida += "  " + p + " -> " + nombreHijo + ";\n";
                g.contador++;
                cosa.generarGrafo(g, nombreHijo);
            }


            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
        }





        return null;
    }
    getNombreHijo(): String {
        return "CLASE";
    }
}