import { AST } from "../AST";
import { ValorGrafo } from "./ValorGrafo";
export class GrafoAST{
    arbol:AST;
    constructor(arbol:AST){
        this.arbol = arbol;
    }


    getGrafo():String{
        let salida = "digraph G{\n\n ";        
        salida += "  nodo0[label=\"AST\"];\n";
        var g = new ValorGrafo(1, salida);
        this.arbol.generarGrafo(g,"nodo0");
        
        g.salida += "\n}";        
   
        return g.salida;
    }

    
    


}