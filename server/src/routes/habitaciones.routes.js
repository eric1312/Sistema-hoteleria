import { Router } from "express";
import { actualizarHabitacion, crearHabitacion, eliminarHabitacion, obtenerHabitaciones, obtenerHabitacionPorId } from "../controllers/habitaciones.controller.js"; 

const router = Router();

router.get('/habitaciones', obtenerHabitaciones);

router.get('/habitaciones/:id', obtenerHabitacionPorId);

router.post('/habitaciones', crearHabitacion);

router.patch('/habitaciones/:id', actualizarHabitacion);

router.delete('/habitaciones/:id', eliminarHabitacion );

export default router;