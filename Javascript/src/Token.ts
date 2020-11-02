export abstract class tok{

    public fila: String;
    public columna: String;
    public tipo: String;
    public descripcion: String;

    constructor(fila:String, columna:String, tipo:String, descripcion:String){       
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.descripcion = descripcion;
    } 

 

 
    
}

export class Token extends tok {


    public fila: String;
    public columna: String;
    public tipo: String;
    public descripcion: String;

    constructor(fila:String, columna:String, tipo:String, descripcion:String){       
        super(fila,columna,tipo,descripcion);
    } 
    
public getfila():String {
    return this.fila;
}

public getcolumna():String {
    return this.columna;
}

public gettipo():String {
    return this.tipo;
}

public getdescripcion():String {
    return this.descripcion;
}

setfila(fila:String) {
    this.fila = fila;
}
    
setcolumna(columna:String) {
    this.columna = columna;
}
settipo(tipo:String) {
    this.tipo = tipo;
}

setdescripcion(descripcion:String) {
    this.descripcion = descripcion;
}

}