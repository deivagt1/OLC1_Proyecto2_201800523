import { Token, tok } from "./Token"
export const tokens = new Array<Token>();
export const errorTokens = new Array<Token>();


export class ListaToken {

    constructor(){       
        
    } 

    generar():String{  
        let cadena = "";
        for(let i = 0; i < tokens.length;i++){         
            let tok = tokens[i];    
            cadena += "Fila: " +tok.fila +" | Columna: "+tok.columna+" | Tipo: "+tok.tipo+ " | Descripcion: " + tok.descripcion +"\n";
        }

        return cadena;
    }    
    
}

export class ListaErrores {
    constructor(){

    }

    generar():String{  
        let cadena = "";
        for(let i = 0; i < errorTokens.length;i++){         
            let err = errorTokens[i];    
            cadena += "Fila: " +err.fila +" | Columna: "+err.columna+" | Tipo: "+err.tipo+ " | Descripcion: " + err.descripcion +"\n";
        }
        return cadena;
    }  
}


