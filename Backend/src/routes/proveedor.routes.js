import { Router } from "express";
import { registrarProveedor,getProveedor,getProveedorById,updateProveedor,deleteProveedor,getProveedorIdByName} from "../controllers/proveedor.controllers.js";
const router=Router();
//CRUD
router.get('/proveedor',getProveedor);
router.get('/proveedor/:id',getProveedorById);
router.post('/proveedor',registrarProveedor);
router.post('/proveedor/ex',getProveedorIdByName);
router.patch('/proveedor/update',updateProveedor);
router.delete('/proveedor/delete',deleteProveedor);

export default router;