import { Sentencia } from "../sentencia";
import { TipoDeOperacion } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class OperacionRelacional extends Sentencia {
    operador1:Sentencia;
    operador2:Sentencia;
    tipoOperacion:TipoDeOperacion;
    /**
     * @class 
     * @param line
     * @param column
     * @param operador1
     * @param operador2
     * @param tipoOperacion
     */
    constructor(tipoOperacion:TipoDeOperacion, operador1:Sentencia, operador2:Sentencia, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }

    translate() {
        switch(this.tipoOperacion){
            case TipoDeOperacion.MAYOR:
                return this.operador1.translate()+" > "+ this.operador2.translate();
            case TipoDeOperacion.MENOR:
                return this.operador1.translate()+" < "+ this.operador2.translate();
            case TipoDeOperacion.MAYORIGUAL:
                return this.operador1.translate()+" >= "+ this.operador2.translate();
            case TipoDeOperacion.MENORIGUAL:
                return this.operador1.translate()+" <= "+ this.operador2.translate();
            case TipoDeOperacion.DOSIGUAL:
                return this.operador1.translate()+" == "+ this.operador2.translate();
            case TipoDeOperacion.DISTINTO:
                return this.operador1.translate()+" != "+ this.operador2.translate();
        }
        return "";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
    
        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.operador1.getNombreHijo() + "\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.operador1.generarGrafo(g,nombreHijo);

  
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+this.SimboloOperacion() + "\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        
        if(this.operador2 != null){
            
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
        
    }
    getNombreHijo(): String {
        switch(this.tipoOperacion){
            case TipoDeOperacion.MAYOR:
                return "MAYOR";
            case TipoDeOperacion.MENOR:
                return "MENOR";
            case TipoDeOperacion.MAYORIGUAL:
                return "MAYORIGUAL";
            case TipoDeOperacion.MENORIGUAL:
                return "MENORIGUAL";
            case TipoDeOperacion.DOSIGUAL:
                return "DOBLEIGUAL";
            case TipoDeOperacion.DISTINTO:
                return "DISTINTO";
            default:
                return "";
        }
    }

    SimboloOperacion(): String {
        switch(this.tipoOperacion){
            case TipoDeOperacion.MAYOR:
                return ">";
            case TipoDeOperacion.MENOR:
                return "<";
            case TipoDeOperacion.MAYORIGUAL:
                return ">=";
            case TipoDeOperacion.MENORIGUAL:
                return "<=";
            case TipoDeOperacion.DOSIGUAL:
                return "==";
            case TipoDeOperacion.DISTINTO:
                return "!=";
            default:
                return "";
        }
    }
}