import proveedor from "../models/Proveedor.js";

export const registrarProveedor=async (req,res)=>{
    console.log(req.body)
    const {Nombre,Contacto,Direccion,Correo}=req.body;
    try{
        const proveedorCreado=await proveedor.create({
            Nombre,Contacto,Direccion,Correo
        })
        res.status(200).json(
            {msg:'provedor registrado',proveedorCreado}
        )
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}


export const getProveedor=async(req,res)=>{
    try{
        const proveedores= await proveedor.findAll();
        res.status(200).json(proveedores);
    }catch(error){
        res.status(500).json({err:error.message})
    }
}


export const getProveedorById=async(req,res)=>{
    const  idd=Number(req.params.id)
    try{
        const existeProv=await proveedor.findOne({where:{ProveedorID: idd}});
        if(!existeProv)
            return res.status(404).json({msg:"No se encontro al prov"})
        res.status(200).json(existeProv);
    }catch(error){
        res.status(500).json({err:error.message})
    }
}


export const updateProveedor=async(req,res)=>{
    console.log(req.body)
    const {Nombre,Contacto,Direccion,Correo,id}= req.body.data
    try{
        const existProveedor=await  proveedor.findByPk(Number(id))
        console.log(existProveedor)
        if(existProveedor){
            await proveedor.update({
                Nombre:Nombre || existProveedor.Nombre,
                Contacto:Contacto || existProveedor.Contacto,
                Direccion:Direccion || existProveedor.Direccion,
                Correo:Correo || existProveedor.Correo
            },{where:{
                ProveedorID:existProveedor.ProveedorID
                }
            })
        }else{
            return res.status(404).json({msg:"Proveedor no encontrado"})
        }
        res.status(200).json({msg:'Proveedor actualizado',})
    }catch(error){
        res.status(500).json({err:error.message})
    }
}

export const deleteProveedor = async (req, res) => {
    const { id } = req.body; // Extrae el ID del cuerpo de la solicitud

    // Verifica si el ID se recibió y es un número válido
    const numericId = Number(id);
    if (!id || isNaN(numericId)) {
        return res.status(400).json({ msg: "ID inválido" });
    }

    const existProveedor = await proveedor.findOne({ where: { ProveedorID: numericId } });
    if (!existProveedor) {
        return res.status(404).json({ msg: "Proveedor no encontrado" });
    }
    try {
        await proveedor.destroy({ where: { ProveedorID: numericId } });
        res.status(200).json({ msg: "Proveedor eliminado" });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};

export const getProveedorIdByName = async (req, res) => {
    console.log(req.body)
    const { Nombre } = req.body; // Obtener el nombre del proveedor desde los parámetros
    try {
        // Buscar el proveedor por nombre
        const proveedorEncontrado = await proveedor.findOne({
            where: { Nombre: Nombre }
        });

        // Si no se encuentra el proveedor
        if (!proveedorEncontrado) {
            return res.status(404).json({ msg: "Proveedor no encontrado" });
        }

        // Devolver el ID del proveedor
        res.status(200).json({ ProveedorID: proveedorEncontrado.ProveedorID });
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
};