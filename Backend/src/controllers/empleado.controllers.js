import Empleado, { getEmple } from '../models/Empleado.js'
import Usuario from '../models/Usuario.js'
import Documento from '../models/Documento.js';
import DetalleDocumento from '../models/DetalleDocumento.js';
import Telefono from '../models/Telefono.js';
import bcrypt from "bcryptjs"


export const registerEmpleado = async (req, res) => {
    console.log(req.body)
    const { Nombre, NumeroDocumento, Correo, Contrasena, Sexo, FechaNacimiento, Salario, HorarioInicio, HorarioFin, telefono } = req.body;
    try {
        // Verificar si el correo ya está registrado
        const correoRegistrado = await Usuario.findOne({ where: { Correo } });
        if (correoRegistrado) {
            return res.status(400).json({ msg: "Ya hay un empleado registrado con ese correo" });
        }

        // Obtener el tipo de documento de 'Cédula de Identidad'
        const tipoDocumento = await Documento.findOne({
            where: { TipoDocumento: 'Cédula de Identidad' },
        });
        
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(Contrasena, 10);
        const RolID=2;
        // Crear nuevo usuario
        const newEmpleado = await Usuario.create({
            Nombre, Correo, Contrasena: hashedPassword, FechaNacimiento, Sexo:Sexo, RolID
        });

        // Crear registro en la tabla 'Empleado'
        await Empleado.create({
            EmpleadoID: newEmpleado.UsuarioID,
            Salario,
            HorarioInicio,
            HorarioFin
        });

        // Crear el detalle del documento
        await DetalleDocumento.create({
            UsuarioID: newEmpleado.UsuarioID,
            DocumentoID: tipoDocumento.DocumentoID,
            NumeroDocumento
        });

        // Registrar el teléfono
        await Telefono.create({
            UsuarioID: newEmpleado.UsuarioID,
            Nro: telefono
        });

        res.status(200).json({ msg: "Empleado registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: error.message });
    }
};

export const getEmpleado=async (req,res)=>{
    try{
        const empleados=await Empleado.findAll();
        res.status(200).json(empleados)
    }catch (error){
        console.log(error)
        res.status(500).json({err:error.message})
    }
}


export const getEmpleadoById=async (req,res)=>{
    try{
       const emple=await getEmple(Number(req.params.id))
       res.status(200).json(emple);
    }catch (error){
        console.log(error)
        res.status(500).json({err:error.message})
    }
}


export const updateEmpleado=async (req,res)=>{
    const [Nombre,Correo,Contrasena,sexo,FechaNacimiento,RolID,Salario,HorarioInicio,HoarioFin]=req.body
    try {
        const existEmple= await Empleado.findByPk(req.params.id)
        if(!existEmple){
            return res.status(404).json({msg:"empleado no encontrado"})
        }
        const user=await Usuario.findByPk(req.params.id)
        await Empleado.update({
            Salario:Salario|| existEmple.Salario,
            HorarioInicio:HorarioInicio ||existEmple.HorarioInicio,
            HoarioFin:HoarioFin || existEmple.HoarioFin
        },)

        await Usuario.update({
                Nombre: Nombre || user.Nombre,  // si no se envia mantiene el valor actual 
                Correo: Correo || user.Correo,
                Contrasena:Contrasena || user.Contrasena,  
                sexo:sexo || user.sexo,
                FechaNacimiento: FechaNacimiento || user.FechaNacimiento,
                RolID: RolID || user.RolID
           },{
            where:{ UsuarioID:existEmple.EmpleadoID}
           })
    } catch (error) {
        res.status(500).json({err:error.message})
    }
    

}


export const deleteEmpleado=async (req,res)=>{
    const idd=Number(req.params.id)
    try {
        const emple= await Empleado.findByPk(idd);
        if(!emple){
            return res.status(404).json({msg:"empleado no encontrado"})
        }
        await Empleado.destroy({where:{EmpleadoID: idd}})
        await Usuario.destroy({where:{EmpleadoID:idd}})
        res.status(200).json({msg:"cliente eliminado",})
    } catch (error) {
        console.log(error)
        res.status(500).json({err:error.message})
    }
}