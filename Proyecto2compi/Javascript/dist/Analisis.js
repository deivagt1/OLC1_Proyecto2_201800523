"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalizarJava = void 0;
const Gramatica = require("../Gramatica/gramatica");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
const ListaToken_1 = require("./ListaToken");
function AnalizarJava(entrada) {
    console.log("***********************************");
    console.log(entrada);
    console.log("***********************************");
    let codigo = `
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
        while(true){ 
            a = "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);
           
        }

        break;
        continue;
        return "hola"+":)"+59.5*12.2+(10.9*12.12-56.56/0.1);
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
    let ast = Gramatica.parse(codigo);
    let lt = new ListaToken_1.ListaToken();
    console.log("\n\n----------------  ----------------\n");
    lt.imprimir();
    //Generacion de grafo
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    //console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    //console.log("\n--------------------------------------------\n");
    return nuevoCodigo;
}
exports.AnalizarJava = AnalizarJava;
