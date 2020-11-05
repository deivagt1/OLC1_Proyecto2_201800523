import { Request, Response } from "express";
import { AnalizarJava } from './Analisis';

export let analizar = (req:Request, res: Response) => {   
    let codigo:string = req.body.codigo;  
    let a = AnalizarJava(codigo);    
    res.send(a);  
}




