import { Router } from "express";
import { obtenerReservas, obtenerReservaPorId, crearReserva, actualizarReserva, eliminarReserva } from "../controllers/reservas.controller.js";


const router = Router();


router.get('/reservas', obtenerReservas);

router.get('/reservas/:id', obtenerReservaPorId);

router.post('/reservas', crearReserva);

router.patch('/reservas/:id', actualizarReserva);

router.delete('/reservas/:id', eliminarReserva);



export default router;