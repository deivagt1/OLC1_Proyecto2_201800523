"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const sentencia_1 = require("../sentencia");
const Tipo_1 = require("../Tipo");
class Funcion extends sentencia_1.Sentencia {
    constructor(tiporetorno, nombreFuncion, parametros, sentencias, line, column) {
        super(line, column);
        this.tiporetorno = tiporetorno;
        this.sentencias = sentencias;
        this.nombreFuncion = nombreFuncion;
        this.parametros = parametros;
    }
    translate() {
        let cadena = "function " + this.nombreFuncion + "(";
        for (const par of this.parametros) {
            cadena += par.translate();
        }
        cadena = cadena.slice(0, -2);
        cadena += "){\n";
        for (const sent of this.sentencias) {
            cadena += sent.translate();
        }
        cadena += "\n}\n";
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"TIPO RETORNO\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + Tipo_1.Tipo[this.tiporetorno] + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"" + this.nombreFuncion + "\"];\n";
        g.salida += "  " + p + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"(\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"PARAMETROS\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        p = nombreHijo;
        for (let x = 0; x < this.parametros.length; x++) {
            let par = this.parametros[x];
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + par.getNombreHijo() + "\"];\n";
            g.salida += "  " + p + " -> " + nombreHijo + ";\n";
            g.contador++;
            par.generarGrafo(g, nombreHijo);
        }
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\")\"];\n";
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
        p = nombreHijo;
        for (let x = 0; x < this.sentencias.length; x++) {
            let sent = this.sentencias[x];
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + sent.getNombreHijo() + "\"];\n";
            g.salida += "  " + p + " -> " + nombreHijo + ";\n";
            g.contador++;
            sent.generarGrafo(g, nombreHijo);
        }
        nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\"}\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "FUNCION";
    }
}
exports.Funcion = Funcion;
