import {Router} from "express"
import {insertarCategoriaPadre,insertarCategoriaHija,modificarCategoriaPorNombre, obtenerCategorias, eliminarCategoriaPorNombre } from "../controllers/categoria.controllers.js";

const router=Router();

router.post('/categoriaHija',insertarCategoriaHija);
router.post('/categoriaPadre',insertarCategoriaPadre); 
router.patch('/catmodificar',modificarCategoriaPorNombre);
router.get('/getCategoria',obtenerCategorias);
router.delete('/DeleteCategoria',eliminarCategoriaPorNombre);

export default router