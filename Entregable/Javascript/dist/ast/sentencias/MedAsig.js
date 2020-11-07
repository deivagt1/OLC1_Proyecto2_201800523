"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedAsig = void 0;
const sentencia_1 = require("../sentencia");
class MedAsig extends sentencia_1.Sentencia {
    /**
     *
     * @class
     * @param id
     * @param line
     * @param column
     */
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
        this.Tipo = "MA";
    }
    translate() {
        return this.id + " , ";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.salida += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "MediaAsignacion";
    }
}
exports.MedAsig = MedAsig;
