import { Request, Response } from "express";
import { AnalizarJava } from './Analisis';

export let analizar = (req:Request, res: Response) => {   
    let codigo:string = req.query.codigo;  
    console.log(req.query); 
    console.log(req.body)
    let respuesta = "AnalizarJava(codigo)";   
    let a = [{'analisis': respuesta}, {'grafo': 'reporteAST'}, {'errores': 'reporteErrores'}]
    res.send(a);
      
    
}




