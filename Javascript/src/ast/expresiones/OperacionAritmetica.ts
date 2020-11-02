import { Sentencia } from "../sentencia"
import { Tipo, TipoDeOperacion } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";
import { isForInStatement } from "typescript";

export class OperacionAritmetica extends Sentencia {
    operador1:Sentencia;
    operador2:Sentencia;
    tipoOperacion:TipoDeOperacion;
    
    constructor(tipoOperacion:TipoDeOperacion, operador1:Sentencia, operador2:Sentencia, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }

    translate() {
        switch(this.tipoOperacion){
            case TipoDeOperacion.SUMA:
                return this.operador1.translate()+" + "+ this.operador2.translate();
            case TipoDeOperacion.RESTA:
                return this.operador1.translate()+" - "+ this.operador2.translate();
            case TipoDeOperacion.MULTIPLICACION:
                return this.operador1.translate()+" * "+ this.operador2.translate();
            case TipoDeOperacion.DIVISION:
                return this.operador1.translate()+" / "+ this.operador2.translate();
            case TipoDeOperacion.INCREMENTO:
                return this.operador1.translate() + "++;\n";
            case TipoDeOperacion.DECREMENTO:
                return this.operador1.translate() + "--;\n";
            case TipoDeOperacion.NEGATIVO:
                return this.operador1.translate() + "-";
            
            
        }
        return "";
    }
    
    generarGrafo(g: ValorGrafo, padre: String) {
        
        if( this.tipoOperacion == TipoDeOperacion.NEGATIVO){
            let nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+this.SimboloOperacion() + "\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
        }

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
            case TipoDeOperacion.SUMA:           
                return "SUMA";                
            case TipoDeOperacion.RESTA:  
                return "RESTA";                
            case TipoDeOperacion.MULTIPLICACION:  
                return "MULTIPLICACION"; 
            case TipoDeOperacion.DIVISION: 
                return "DIVISION"; 
            case TipoDeOperacion.INCREMENTO:  
                return "INCREMENTO";
            case TipoDeOperacion.DECREMENTO:
                return "DECREMENTO";
            case TipoDeOperacion.NEGATIVO:  
                return "NEGATIVO";
            default: 
                return "MENOS_UNARIO"; 
            
        }
    
    }

    SimboloOperacion(): String{
        switch(this.tipoOperacion){
            case TipoDeOperacion.SUMA:           
                return "+";                
            case TipoDeOperacion.RESTA:  
                return "-";                
            case TipoDeOperacion.MULTIPLICACION:  
                return "*"; 
            case TipoDeOperacion.DIVISION: 
                return "/"; 
            case TipoDeOperacion.INCREMENTO:  
                return "++";
            case TipoDeOperacion.DECREMENTO:  
                return "--";
            case TipoDeOperacion.NEGATIVO:  
                return "-";
            default: 
                return ""; 
            
        }
    }
}