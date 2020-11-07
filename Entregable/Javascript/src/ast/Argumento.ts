import { ValorGrafo } from "./grafo/ValorGrafo"

export abstract class Argumento{

    public line:Number = 0;
    public column:Number = 0;

  
    constructor(line:Number, column:Number){
        this.line = line;
        this.column = column;
    }


    abstract translate():String;

    abstract generarGrafo(g:ValorGrafo, padre:String):any;
    abstract getNombreHijo():String;
    
}