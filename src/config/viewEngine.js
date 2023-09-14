import express from "express";
import path from "path";
let configviewEngine = (app) => {

    //static file
    app.use(express.static('src/public'));

    app.set('view engine', 'ejs')
    app.set('views', 'src/views');
}
module.exports = configviewEngine;