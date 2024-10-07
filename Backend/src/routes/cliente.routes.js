import {Router} from "express"
import { registrarCliente } from "../controllers/cliente.controller.js";

const router=Router();

router.post('/clientReg',registrarCliente);


export default router