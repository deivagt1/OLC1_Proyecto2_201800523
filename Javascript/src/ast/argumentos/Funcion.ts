import { Sentencia } from  "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo";
import { Tipo } from "../Tipo";
import { Parametros } from "./Parametros";
import { isGetAccessor } from "typescript";

export class Funcion extends Sentencia {
    
    sentencias: Array<Sentencia>;
    nombreFuncion: String;
    parametros: Array<Parametros>;
    tiporetorno: Tipo;
   
    constructor(tiporetorno:Tipo, nombreFuncion:String, parametros:Array<Parametros>, sentencias: Array<Sentencia>, line:Number, column:Number){
        super(line,column);
        this.tiporetorno = tiporetorno;
        this.sentencias = sentencias;
        this.nombreFuncion = nombreFuncion;
        this.parametros = parametros;
    }

    translate() {
        
        let control:Boolean;
        control = false;
        let cadena ="function "; 
        cadena += this.nombreFuncion+"(";
     
        for (const par of this.parametros) {
            if(control == false){
                control = true;
            }
            cadena += par.translate();
        }     
        
        if(control == true){
            cadena = cadena.slice(0,-2);
        }
        

        cadena += "){\n";

        for (const sent of this.sentencias) {
            console.log(sent);
            if(sent != null){
                cadena += sent.translate();
            }
            
        }
        cadena += "\n}\n"
        return cadena;
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p = padre;

        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"TIPO RETORNO\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;        
        p = nombreHijo;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+Tipo[this.tiporetorno]+"\"];\n";
        g.salida += "  "+p +" -> "+ nombreHijo+";\n";
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
       
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"PARAMETROS\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   
        p = nombreHijo;

    
        for (let x = 0; x < this.parametros.length; x++) {
            let par = this.parametros[x];
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\""+par.getNombreHijo()+"\"];\n";
            g.salida += "  "+p +" -> "+ nombreHijo+";\n";
            g.contador++;
            par.generarGrafo(g,nombreHijo);
        }
        


        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\")\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"{\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;   
        
       
        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        p = nombreHijo;
        
        for (let x = 0; x < this.sentencias.length; x++) {
            let sent = this.sentencias[x];
            if(sent != null){
                nombreHijo = "nodo"+g.contador;
                g.salida += "  "+nombreHijo +"[label=\""+sent.getNombreHijo()+"\"];\n";
                g.salida += "  "+p +" -> "+ nombreHijo+";\n";
                g.contador++;
                sent.generarGrafo(g,nombreHijo);
            }
            
        }

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"}\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "FUNCION";
    }
}