import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";
import { ListaToken, tokens } from './ListaToken';
import { Token } from './Token';


export function AnalizarJava(entrada:string):String{
    console.log("***********************************")
    console.log(entrada);


    console.log("***********************************")
    let codigo = 
    `
    public class a{   
        int b(){
            

            for(int i = a i <= 10; i++){
                int a = 0
                int b = 1;
                int d = 1;
                } 
        }        
        
    }
    `;
    /*

a = "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);

    int a (String b, int abc){
        int a,b = 55, c = "abc"; 

        for(int i = 0; i < 10; i++){
            int f = 10;     
        }
    }

    int a (String b, int abc){
        int a=0.0;  
    }

    public static void main(String[] args){
        int a=0.0;
    }
     while(true){ 
            a = "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);
           
        }

         public static void main(String[] args){
            int a=0.0;
        }
    */
    // Analisis Lexico y Sintactico
    console.log("\n\n---------------- INICIO ----------------\n");
    let ast = Gramatica.parse(codigo) as AST;
    let lt = new ListaToken();
    console.log("\n\n----------------  ----------------\n");

    lt.imprimir();
    

    //Generacion de grafo

    
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()
    //console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    //console.log("\n--------------------------------------------\n");
    return nuevoCodigo;
}