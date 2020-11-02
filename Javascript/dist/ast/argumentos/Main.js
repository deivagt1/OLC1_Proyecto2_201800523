"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const sentencia_1 = require("../sentencia");
class Main extends sentencia_1.Sentencia {
    constructor(main, sentencias, line, column) {
        super(line, column);
        this.sentencias = sentencias;
        this.main = main;
    }
    translate() {
        let cadena = this.main + "(){\n";
        for (const ins of this.sentencias) {
            cadena += ins.translate();
        }
        return cadena + "\n}\n";
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"public\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"static\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"void\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"main\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"(\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"String\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"[\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"]\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"args\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\")\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"{\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------- LISTA DE SENTENCIAS -----------
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.sentencias.length; x++) {
            let sent = this.sentencias[x];
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + sent.getNombreHijo() + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            sent.generarGrafo(g, nombreHijo);
        }
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "MAIN";
    }
}
exports.Main = Main;
