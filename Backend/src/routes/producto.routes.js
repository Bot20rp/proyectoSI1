import { Router } from "express";
// import { registerProducto,getProducto,getProductoByID,updateProducto,deleteProducto } from "../controllers/producto.controllers.js";
import { registrarProducto,getProducto } from "../controllers/productos.controlles.js";
const router=Router();


router.get('/producto',getProducto)
// router.get('/producto',getProductoByID)
router.post('/productoReg',registrarProducto)
// router.patch('/producto/:id',updateProducto)
// router.delete('/producto/:id',deleteProducto)
export default  router;