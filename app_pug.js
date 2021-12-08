const express = require("express");
const Libreria = require('./libs/libreria')
const Contenedor = require("./class/contenedor");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})) 

const libreria = new Libreria(__dirname + "/data/libros.json")
const productos = new Contenedor(__dirname + "/data/productos.json");

app.set('views', './views/pug')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    let content = productos.content
    return res.render('index.pug', {content})
})

app.post("/productos", (req, res) => {
    productos.save(req.body)
    let content = productos.content
    return res.render('productos.pug', {content});
});

app.get("/productos", (req, res) => {
    let content = productos.content
    return res.render('productos.pug', {content});
});

app.listen(3000);