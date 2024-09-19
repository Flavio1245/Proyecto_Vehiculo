const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

// Ruta para todos los datos de la DB
router.get('/', async (req, res, next) => {
    try {
        const vehiculos = await controlador.todos();
        res.json(vehiculos); // Asegúrate de devolver los vehículos en formato JSON
    } catch (err) {
        next(err);
    }
});


// Ruta para consultar por PLACA
router.get('/:PLACA', async (req, res, next) => {
    try {
        const item = await controlador.uno(req.params.PLACA);
        respuesta.success(req, res, item, 200); // Devuelve el objeto consultado
    } catch (err) {
        next(err);
    }
});

// Ruta para agregar un vehículo
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        await controlador.agregar(body);
        res.status(201).send({ message: 'Vehículo agregado con éxito' });
    } catch (err) {
        next(err);
    }
});

// Ruta para eliminar un vehículo

router.delete('/:placa', async (req, res, next) => {
    try {
        const { placa } = req.params;
        await controlador.eliminar(placa);
        res.status(200).send({ message: 'Vehículo eliminado con éxito' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
