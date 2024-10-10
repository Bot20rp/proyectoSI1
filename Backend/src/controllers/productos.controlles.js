import producto,{createProducto, obtProducto} from "../models/Producto.js";


export const registrarProducto=async (req,res)=>{
    // const {Nombre,Precio,Volumen,Marca,Estante,CategoriaID}=req.body
    console.log(req.body)
    try {
        const produc =await createProducto(req.body.data)
        res.status(200).json({msj:"siuuuuu"})
    } catch (error) {
       res.status(500).json({err:error.message}) 
    }
}

export const getProducto=async (req,res)=>{
    // const {Nombre,Precio,MarcaID,Estante,Categoria,Volumen}=req.body
    console.log(req.body)
    try {
        const productos=await obtProducto()
        res.status(200).json(productos)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}