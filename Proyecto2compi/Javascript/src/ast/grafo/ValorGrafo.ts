export class ValorGrafo {
    contador:number;    
    salida:String;       


    constructor(contador:number, salida:String) {
        this.contador = contador;
        this.salida = salida;
    }

    getContador() :number{
        return this.contador;
    }

    getGrafo():String {
        return this.salida;
    }

    setContador(contador:number) {
        this.contador = contador;
    }

    setGrafo(grafo:String) {
        this.salida = grafo;
    }
}