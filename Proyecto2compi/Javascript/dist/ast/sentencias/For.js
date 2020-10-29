"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const sentencia_1 = require("../sentencia");
class For extends sentencia_1.Sentencia {
    constructor(declaracion, expresion1, expresion2, sentencias, line, column) {
        super(line, column);
        this.declaracion = declaracion;
        this.expresion1 = expresion1;
        this.expresion2 = expresion2;
        this.sentencias = sentencias;
    }
    translate() {
        let cadena = "for(";
        cadena += this.declaracion.translate();
        cadena = cadena.slice(0, -2);
        cadena += "; ";
        cadena += this.expresion1.translate();
        cadena += "; ";
        cadena += this.expresion2.translate();
        cadena = cadena.slice(0, -2);
        cadena += "){\n";
        for (const sent of this.sentencias) {
            cadena += sent.translate();
        }
        return cadena + "\n}\n";
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"For\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\" (\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"DECLARACION\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        this.declaracion.generarGrafo(g, p);
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"EXPRESION\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        this.expresion1.generarGrafo(g, p);
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\";\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"EXPRESION\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        this.expresion2.generarGrafo(g, p);
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\")\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"{\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"SENTENCIAS\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        for (let x = 0; x < this.sentencias.length; x++) {
            let decl = this.sentencias[x];
            decl.generarGrafo(g, p);
        }
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "FOR";
    }
}
exports.For = For;
