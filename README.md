# Proyecto de Gestión de Vehículos

Este es un proyecto para gestionar información sobre vehículos, incluyendo funcionalidades para insertar, consultar y eliminar vehículos.

## Estructura del Proyecto
```
proyecto
├── src
│   ├── DB
│   │   └── mysql.js
│   ├── middleware
│   │   └── errors.js
│   ├── modulos
│   │   └── vehiculos
│   │       ├── controlador.js
│   │       ├── rutas.js
│   ├── public
│   │   └── css
│   │       └── styles.css
│   ├── red
│   │   ├── errors.js
│   │   └── respuestas.js
│   ├── views
│   │   ├── partials
│   │   │   ├── consulta.ejs
│   │   │   ├── eliminar.ejs
│   │   │   ├── insertar.ejs
│   │   │   └── todos.ejs
│   │   └── index.ejs
│   ├── app.js
│   ├── config.js
│   └── index.js
├── .env
├── package.json
└── package-lock.json
```
## Instrucciones para levantar un ambiente local de desarrollo

### 1. Instalación de Node.js
Asegúrate de tener instalado Node.js en tu máquina. Puedes descargarlo desde [aquí](https://nodejs.org/).

### 2. Clonar el repositorio
Abre tu terminal y clona tu proyecto desde el repositorio de GitHub:
```
git clone <URL_DE_TU_REPOSITORIO>
```
###3. Instalación de dependencias
Navega a la carpeta del proyecto:

```bash
Copiar código
cd <NOMBRE_DE_TU_CARPETA>
```
###Instala las dependencias necesarias ejecutando

```bash
Copiar código
npm install
```
###5. Levantar la aplicación
Para iniciar la aplicación, ejecuta el siguiente comando:
```bash
npm start
```

6. Acceso a la aplicación
Abre un navegador web y dirígete a http://localhost:4000 para acceder a la aplicación.


Schema de base de datos
Asegúrate de tener el schema de la base de datos definido según las necesidades de tu aplicación. Aquí tienes un ejemplo básico:

```SQL
Copiar código
CREATE TABLE vehiculos (
    PLACA VARCHAR(10) NOT NULL UNIQUE,
    MARCA VARCHAR(50) NOT NULL,
    MODELO VARCHAR(50) NOT NULL,
    ANIO INT CHECK (ANIO >= 1900 AND ANIO <= 2025),
    ESTADO ENUM('Perfecto', 'Daño Menor', 'Reparacion Urgente', 'En reparación', 'Descarte') NOT NULL,
    PRIMARY KEY (PLACA)
);
```

