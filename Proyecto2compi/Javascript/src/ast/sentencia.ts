import { ValorGrafo } from "./grafo/ValorGrafo"

export abstract class Sentencia{

    public line:Number = 0;
    public column:Number = 0;

    constructor(line:Number, column:Number){
        this.line = line;
        this.column = column;
    }

    // Metodo en el cual se traduce el codigo
    abstract translate():String;

    // Metodos para la generacion del reporte del grafo
    abstract generarGrafo(g:ValorGrafo, padre:String):any;
    abstract getNombreHijo():String;
    
}

