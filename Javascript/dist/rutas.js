"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analizar = void 0;
exports.analizar = (req, res) => {
    let codigo = req.query.codigo;
    console.log(req.query);
    let respuesta = "AnalizarJava(codigo)";
    let a = [{ 'analisis': respuesta }, { 'grafo': 'reporteAST' }, { 'errores': 'reporteErrores' }];
    res.send(a);
};
