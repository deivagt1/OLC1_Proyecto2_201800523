import { Sentencia } from "../sentencia"
import { ValorGrafo } from "../grafo/ValorGrafo"

export class Print extends Sentencia {
    expresion:Sentencia;
    tipo:number;
    
    constructor(tipo:number,expresion:Sentencia, line:Number, column:Number){
        super(line,column)
        this.expresion = expresion;
    }

    translate() {
        return "console.log("+this.expresion.translate()+");\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {

        let nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"System\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\".\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"out\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\".\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        if(this.tipo == 0){
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\"print\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
        }else{
            nombreHijo = "nodo"+g.contador;
            g.salida += "  "+nombreHijo +"[label=\"println\"];\n";
            g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
        }

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\"(\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\""+ this.expresion.getNombreHijo() +"\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.expresion.generarGrafo(g,nombreHijo);

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\")\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        nombreHijo = "nodo"+g.contador;
        g.salida += "  "+nombreHijo +"[label=\";\"];\n";
        g.salida += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        return null;
    }
    getNombreHijo(): String {
        return "PRINT";
    }

}