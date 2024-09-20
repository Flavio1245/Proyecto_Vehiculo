const mysql = require('mysql')
const config = require('../config')

//archivo de configuracion 
//CONNECTION MYSQL--
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};
let conexion;
function conMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((error) =>{
        if(error){
            console.log('[db error]',error);
        }else{
            console.log('DB conectada')
        }
        conexion.on('error',error =>{
            console.log('[db err',error);
            if(error.code === 'PROTOCOL_CONNECTION_LOST'){
                conMysql();
            }else{
                throw error;
            }
        });
    });
}
conMysql();
//--END CONNECTION MYSQL


//FUNCION MOSTRAR TODOS
function todos(tabla){
 return new Promise((resolve,reject)=>{
    conexion.query(`SELECT * FROM flotilla.vehiculos`,(error,result)=>{
        return error ? reject(error) : resolve(result);
    })
 });
}
//--END MOSTRAR TODOS


//FUNCION MOSTRAR UNO (PLACA)
function uno(tabla, PLACA) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE PLACA = ?`, [PLACA], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

//END FUNCION MOSTRAR UNO

// Función para verificar si la placa ya existe
function verificarPlacaExistente(PLACA) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) AS count FROM vehiculos WHERE PLACA = ?`;
        conexion.query(query, [PLACA], (err, results) => {
            if (err) {
                return reject(err);
            }
            const existe = results[0].count > 0;
            resolve(existe);
        });
    });
}

// Función para insertar datos
function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

// Función para actualizar datos
function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE PLACA = ?`, [data, data.PLACA], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

// Función para agregar datos (insertar o actualizar)
function agregar(tabla, data) {
    if (data && data.PLACA) {
        return verificarPlacaExistente(data.PLACA)
            .then(existe => {
                if (existe) {
                    return actualizar(tabla, data);
                } else {
                    return insertar(tabla, data);
                }
            });
    } else {
        return Promise.reject(new Error('La placa es requerida'));
    }
}


function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE PLACA = ?`;
        conexion.query(query, [data.PLACA], (error, result) => {
            if (error) {
                console.error('Error en la consulta DELETE:', error); // Agregar esta línea
                return reject(error);
            }
            resolve(result);
        });
    });
}
module.exports = {
    todos,
    uno,
    agregar,
    eliminar
}