const db = require('../../DB/mysql');

const TABLA ='vehiculos';

//todos los datos 
async function todos(){

    return db.todos(TABLA)
}

//por ID== (PLACA)
function uno(PLACA) {
    console.log('Consultando vehículo con PLACA:', PLACA); // Log para verificar
    return db.uno(TABLA, PLACA)
        .then(result => {
            console.log('Resultado de la consulta:', result); // Agregar esta línea
            return result;
        })
        .catch(err => {
            throw new Error('Error al consultar el vehículo: ' + err.message);
        });
}

//Agregar

function agregar(body) {
    return db.agregar(TABLA, body)
        .catch(err => {
            throw new Error('Error al agregar el vehículo: ' + err.message);
        });
}


//eliminar
function eliminar(PLACA) {
    return db.eliminar(TABLA, { PLACA })
        .catch(err => {
            console.error('Error al eliminar el vehículo:', err); // Agregar esta línea
            throw new Error('Error al eliminar el vehículo: ' + err.message);
        });
}

// agregar
function agregar(body) {
    return db.agregar(TABLA, body)
        .catch(err => {
            throw new Error('Error al agregar el vehículo: ' + err.message);
        });
}



module.exports={
    todos,
    uno,
    agregar,
    eliminar
}