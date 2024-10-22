import {Router} from "express"
import { getBitacora,createBitacora } from "../controllers/bitacora.controllers.js";
const router=Router();

// router.post('/crearbitacora',createBitacora);
router.get('/bitacora',getBitacora);

export default router;