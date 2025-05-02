import { Router } from "express";  
import { actualizarHuesped, eliminarHuesped, obtenerHuespedes, obtenerHuespedPorId, registrarHuesped } from "../controllers/huespedes.controller.js";

const router = Router();


router.get('/huespedes', obtenerHuespedes );

router.get('/huespedes/:id', obtenerHuespedPorId);

router.post('/huespedes', registrarHuesped);

router.patch('/huespedes/:id', actualizarHuesped);

router.delete('/huespedes/:id', eliminarHuesped );

export default router;
