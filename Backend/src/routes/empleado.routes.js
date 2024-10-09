import { Router } from "express";
import { registerEmpleado,getEmpleado,getEmpleadoById,deleteEmpleado,updateEmpleado } from "../controllers/empleado.controllers.js";
const router=Router();

router.get('/empleado',getEmpleado);
router.get('/empleado/:id',getEmpleadoById);
router.post('/empleadoreg',registerEmpleado);
router.patch('/empleado/:id',updateEmpleado);
router.delete('/empleado/:id',deleteEmpleado);
export default router;