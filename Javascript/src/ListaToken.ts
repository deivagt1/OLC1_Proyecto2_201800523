import { Token, tok } from "./Token"
export const tokens = new Array<Token>();

export class ListaToken {

    constructor(){       
        
    } 

    imprimir(){  
        for(let i = 0; i < tokens.length;i++){         
            let tok = tokens[i];    
            console.log("Fila: " +tok.fila +" Columna: "+tok.columna+" Tipo: "+tok.tipo+ " Descripcion: " + tok.descripcion);
        }
    }    
    
}


