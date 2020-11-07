"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analizar = void 0;
const Analisis_1 = require("./Analisis");
exports.analizar = (req, res) => {
    let codigo = req.body.codigo;
    let a = Analisis_1.AnalizarJava(codigo);
    res.send(a);
};
