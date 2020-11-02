import { Sentencia } from "../sentencia";
import { TipoDeOperacion } from "../Tipo";

export class OperacionLogica extends Sentencia {
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
            case TipoDeOperacion.AND:
                return this.operador1.translate()+" && "+ this.operador2.translate();
            case TipoDeOperacion.OR:
                return this.operador1.translate()+" || "+ this.operador2.translate();
            case TipoDeOperacion.XOR:
                return this.operador1.translate()+" ^ "+ this.operador2.translate();
            case TipoDeOperacion.NOT:
                return " !"+ this.operador1.translate();
            
        }
        return "";
    }
    generarGrafo(g, padre) {
    
        if(this.tipoOperacion == TipoDeOperacion.NOT){
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
            //Operador2
            nombreHijo = "nodo" + g.contador;
            g.salida += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.salida += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case TipoDeOperacion.AND:
                return "AND";
            case TipoDeOperacion.OR:
                return "OR";
            case TipoDeOperacion.XOR:
                return "XOR";
            case TipoDeOperacion.NOT:
                return "NOT";
            default: 
                return ""; 
        }
    }
    SimboloOperacion(): String{
        switch(this.tipoOperacion){
            case TipoDeOperacion.AND:           
                return "&&";                
            case TipoDeOperacion.OR:  
                return "||";                
            case TipoDeOperacion.NOT:  
                return "!"; 
            case TipoDeOperacion.XOR: 
                return "^"; 
            default: 
                return ""; 
            
        }
    }
}