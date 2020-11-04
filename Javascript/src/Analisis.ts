import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";
import { ListaToken, tokens } from './ListaToken';
import { Token } from './Token';


export function AnalizarJava(entrada:string):String{
    /*console.log("***********************************")
    console.log(entrada);


    console.log("***********************************")*/
    
   
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

    let codigo = `
    public class Myclase 
    {
        
        String variable , variable1 , variable2;
        int constante=100/5*5/5+3+2-1*0+1 + 2;
    
      
        void MyMetodo (){
            metodo_llamada(x);
            String nombre="myMetodo";
            int x , y;
            x=10;
            y=11;
            int variable=3+3-5/5*10;
            System.out.println("myMetodo");
            System.out.print(x);
            break;
        }
        
    }

    
    `
    ; 
    
    console.log("\n\n---------------- INICIO ----------------\n");
    let ast = Gramatica.parse(codigo) as AST;

    //Listado de Token analizados
    let lt = new ListaToken();    
    lt.imprimir();
    
    //Traduccion
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