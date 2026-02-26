🚀 Proyecto Soft Jobs - Autenticación JWT

Este proyecto es una aplicación Full Stack desarrollada para la plataforma Soft Jobs, donde los desarrolladores pueden registrarse, iniciar sesión y ver su perfil privado utilizando tecnologías de autenticación modernas.

🛠️ Tecnologías utilizadas

Frontend: React, Axios, React Router, Context API.
Backend: Node.js, Express.
Base de Datos: PostgreSQL.
Seguridad: JSON Web Tokens (JWT) para sesiones y Bcryptjs para encriptación de contraseñas.
Estilos: Bootstrap.

📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
Node.js
PostgreSQL

⚙️ Configuración del Proyecto

1. Base de Datos 🗄️
Crea una base de datos llamada softjobs y ejecuta el siguiente script SQL para crear la tabla de usuarios:

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL,
  rol VARCHAR(25),
  lenguage VARCHAR(20)
);

2. Backend (Servidor) 💻
Ve a la carpeta server/.
Instala las dependencias:
npm install

Inicia el servidor:
node index.js
El servidor correrá en: http://localhost:3000

3. Frontend (Cliente) ⚛️
   
Ve a la carpeta raíz del proyecto.

Instala las dependencias:
npm install

Inicia la aplicación:
npm run dev

🔑 Funcionalidades Clave

Registro de Usuarios: Los datos se guardan en la DB con la contraseña encriptada.
Login Seguro: Validación de credenciales y generación de Token JWT.
Rutas Protegidas: Solo los usuarios con un token válido pueden acceder a la vista de /perfil.
Middlewares: Registro de consultas en consola y validación de tokens en el servidor.
