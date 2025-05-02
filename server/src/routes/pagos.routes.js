import { Router } from "express";
import { pool } from '../config/db.js';  
import { actualizarPago, eliminarPago, obtenerPagoPorId, obtenerPagos, registrarPago } from "../controllers/pagos.controller.js";

const router = Router();

router.get('/pagos', obtenerPagos);

router.get('/pagos/:id', obtenerPagoPorId );

router.post('/pagos', registrarPago);

router.patch('/pagos/:id', actualizarPago );

router.delete('/pagos/:id', eliminarPago);


export default router;