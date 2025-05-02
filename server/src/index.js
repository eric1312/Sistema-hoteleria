import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import empleadosRoutes from './routes/empleados.routes.js'
import habitacionesRoutes  from "./routes/habitaciones.routes.js";
import huespedesRoutes from './routes/huespedes.routes.js';
import reservasRoutes from './routes/reservas.routes.js';
import pagosRoutes from './routes/pagos.routes.js';



//  dotenv
dotenv.config();

// inicializacion express
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});



// Definimos una ruta basica 
app.get("/", (req, res) => {
    res.status(200).send('Bienvenidos a la API del hotel!');
});


// Rutas de empleados
app.use('/api', empleadosRoutes);

// Rutas de habitaciones
app.use('/api', habitacionesRoutes);

// Rutas de huespedes
app.use('/api', huespedesRoutes);

// Rutas de reservas
app.use('/api', reservasRoutes);


// Rutas de pagos
app.use('/api', pagosRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint Not found'
    });

});



// Puerto de servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
