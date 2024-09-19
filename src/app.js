const express = require('express');
const path = require('path');
const config = require('./config');
const vehiculos = require('./modulos/vehiculos/rutas');
const morgan = require('morgan');
const error = require('./red/errors');
const controlador = require('./modulos/vehiculos/controlador');
const app = express();

// Middleware para JSON y formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejo de errores
app.use(error);

// Middleware para logging
app.use(morgan('dev'));

// Configuración del puerto
app.set('port', config.app.port);

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res, next) => {
    try {
        const items = await controlador.todos(); // Llama a la función todos
        res.render('index', { vehiculos: items }); // Renderiza index.ejs con los datos
    } catch (err) {
        next(err);
    }
});


// Rutas
app.use('/api/vehiculos', vehiculos);

//archivos estaticos
app.use(express.static (path.join(__dirname,'public')));

// Ruta para renderizar la vista index.ejs


module.exports = app;