import {Router} from "express"

import { obtenerUsuariosConDetalles, updateUsuarioG,deleteUsuarioG} from "../controllers/usuario.controller.js";


const router = Router();
// Ruta para registrar un usuario

router.get('/obtener',obtenerUsuariosConDetalles); 
router.patch('/usuario/actualizar',updateUsuarioG);
router.delete('/usuario/del',deleteUsuarioG);

export default router;