import {Router} from "express"

import { obtenerUsuariosConDetalles } from "../controllers/usuario.controller.js";


const router = Router();
// Ruta para registrar un usuario

router.get('/obtener',obtenerUsuariosConDetalles); 

export default router;