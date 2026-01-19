# Fullstack Post Management System 🚀
Este proyecto es una aplicación Fullstack desarrollada como prueba técnica. Permite la gestión de publicaciones (Posts) y comentarios, incluyendo funcionalidades avanzadas como carga masiva, manejo global de errores y una arquitectura modular escalable.

## Tecnologías Utilizadas 🛠️

###  Backend 💾

Framework: NestJS

Base de Datos: MongoDB con Mongoose.

Validación: Class-validator y Class-transformer.

Arquitectura: Modular con Inyección de Dependencias.

### Frontend 💻

Framework: Angular 18+ (Standalone Components).

Estilos: Tailwind CSS y SCSS.

Estado: Angular Signals y RxJS.

Arquitectura: Core/Shared/Features con Path Aliases.


## Pre-requisitos 🧩

1. Tener instalado MongoDB en el equipo junto a MongoCompass (O RoboMongo).

2. Los binarios de mongo deben estar registrados en el PATH para poder correr el comando "mongod".

3. Tener Node.js (al menos la version v20.18.2 o superior) junto con npm (v10.8.2).

4. Tener instalado el CLI de Angular en su version 18+.

## Instrucciones para correr el proyecto 🚀

1. <b>Se debe iniciar mondoDB para poder registrar los datos.</b>
```
    C:\> mongod
```

2. <b>Clonar el repositorio</b>
```
    git clone https://github.com/TeslaWillow/sistema-de-posts.git
    cd <nombre-del-folder-donde-esta-el-proyecto>
```

3. <b>Configurar el Backend</b>
```
    cd posts-backend
    npm install
```
Crea un archivo <b>.env</b> en la raíz de la carpeta backend con tu cadena de conexión a MongoDB:
```
    MONGO_URI=mongodb://localhost:27017/posts_db
    PORT=3000
```
Inicia el servidor:
```
    npm run start:dev
```

4. <b>Configurar el Frontend</b>
```
    cd ../posts-frontend
    npm install
    npm start
```

## Endpoints Principales (API) 📋
En la carpeta /docs se encuentra el .json para ser cargado a postman para hacer pruebas directamente en el backend.


## Archivo JSON para Carga Masiva (Ejemplo) 📄
En la carpeta /docs se encuentra el .json (con muchos mas datos) para ser cargado en el frontend o copiarlo directamente en el backend.

Para probar la funcionalidad de Carga Masiva, puedes usar este formato (con pocos datos):
```
[
  {
    "title": "Arquitectura de NestJS",
    "body": "NestJS utiliza decoradores e inyección de dependencias para crear módulos...",
    "author": "DevMaster"
  },
  {
    "title": "Angular 18 y Signals",
    "body": "Los Signals revolucionaron la detección de cambios eliminando la dependencia excesiva de Zone.js...",
    "author": "FrontEnd_Specialist"
  }
]
```