import { Router } from "express";

import  {obtenerEmpleados, obtenerEmpleadoPorId, crearEmpleado, actualizarEmpleado, eliminarEmpleado}  from '../controllers/empleados.controller.js';
const router = Router();


router.get('/empleados', obtenerEmpleados);

router.get('/empleados/:id', obtenerEmpleadoPorId);

router.post('/empleados', crearEmpleado);

router.patch('/empleados/:id', actualizarEmpleado);

router.delete('/empleados/:id', eliminarEmpleado);

export default router;
