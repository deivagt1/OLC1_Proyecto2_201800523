"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const controller = require("./control");
const app = express();
app.set('port', 3000);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//rutas
app.get('/', (req, res) => {
    res.send(`Prueba de deivid`);
});
app.post('/analizar', controller.analizar);
exports.default = app;
