"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class Declaracion extends sentencia_1.Sentencia {
    constructor(type, valor, line, column) {
        super(line, column);
        this.type = type;
        this.valor = valor;
    }
    translate() {
        let cadena = "var ";
        for (const valores of this.valor) {
            cadena += valores.translate();
        }
        cadena = cadena.slice(0, -3);
        cadena += ";\n";
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\" Tipo: " + Tipo_1.Tipo[this.type] + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.valor != null) {
            for (let x = 0; x < this.valor.length; x++) {
                let par = this.valor[x];
                par.generarGrafo(g, p);
                nombreHijo = "nodo" + g.contador;
                if (x < this.valor.length - 1) {
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
    getNombreHijo() {
        return "DECLARACION";
    }
}
exports.Declaracion = Declaracion;
