import express, { Application } from 'express';
import bodyParser from 'body-parser';
//import * as dotenv from 'dotenv';
import cors from 'cors'
import morgan from 'morgan';
import dotenv from 'dotenv';
// Importar rutas de módulos
import userRoutes from './user/routes/userRoutes';
import exerciseRoutes from './exercise/routes/exerciseRoutes';
import dieteRoutes from './diete/routes/dieteRoutes';
import mailRoutes from './mail/routes/mailRoutes';
import https from 'https';
import fs from 'fs';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';


// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
app.use(morgan('dev'))
app.use(cors())

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de los módulos
app.use('/api/user', userRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/diete', dieteRoutes);
app.use('/api/mail', mailRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);
/*
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});//borrar
*/
// Configurar HTTPS



let key: Buffer;
let cert: Buffer;

try {
  key = fs.readFileSync('/etc/letsencrypt/live/infernogymapi.integrador.xyz/privkey.pem');
  cert = fs.readFileSync('/etc/letsencrypt/live/infernogymapi.integrador.xyz/fullchain.pem');
} catch (error) {
  console.error('Error al leer los archivos de certificados:', error);
  process.exit(1);
}

const options: https.ServerOptions = {
  key,
  cert
};

https.createServer(options, app).listen(port, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${port}`);
});