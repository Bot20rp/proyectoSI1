import { Usuario, Documento, Telefono, DetalleDocumento ,Empleado} from '../models/AsociacionDocumento.js';
import Rol from '../models/Rol.js';
import Administrador from "../models/Administrador.js";
import Cliente from '../models/Cliente.js';

export const obtenerUsuariosConDetalles= async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['UsuarioID', 'Nombre', 'Correo', 'Sexo','FechaNacimiento'], // Incluyendo el UsuarioID
      include: [
        {
          model: DetalleDocumento,
          as: 'DetalleDocumentos',
          attributes: ['NumeroDocumento'],
          include: [
            {
              model: Documento,
              as: 'Documento',
              attributes: ['TipoDocumento'],
            }
          ]
        },
        {
          model: Telefono,
          as: 'Telefonos',
          attributes: ['Nro']
        },
        {
          model: Rol,
          as: 'Rol',
          attributes: ['Nombre']
        },
        {
          model: Empleado,  // Relación con Empleado
          as: 'Empleado',
          attributes: ['Salario', 'HorarioInicio','HorarioFin'] // Atributos de la tabla Empleado
        }
      ]
    });

    // Convertir los datos al formato requerido
    const usuariosFormateados = usuarios.map(usuario => ({
      id: usuario.UsuarioID,  // Usar el UsuarioID como id
      usuario: usuario.Nombre,
      correo: usuario.Correo,
      telefono: usuario.Telefonos[0]?.Nro || 'No registrado',  // Si no tiene teléfono, mostrar un mensaje por defecto
      genero: usuario.Sexo === 'M' ? 'Masculino' : 'Femenino',  // Convertir "Sexo" a "Masculino" o "Femenino"
      rol: usuario.Rol?.Nombre || 'No asignado',  // Mostrar rol, o "No asignado" si no existe
      salario: usuario.Empleado?.Salario || 'No registrado',  // Mostrar salario o 'No registrado'
      horarioInicio: usuario.Empleado?.HorarioInicio || 'No registrado' ,// Mostrar horario laboral o 'No registrado'
      horarioFin: usuario.Empleado?.HorarioFin || 'No registrado',// Mostrar horario laboral o 'No registrado'
      fechaNacimiento: usuario.FechaNacimiento // Mostrar horario laboral o 'No registrado'
    }));

    res.status(200).json({
      message: 'Usuarios obtenidos exitosamente',
      usuarios: usuariosFormateados
    });
  } catch (error) {
    console.error('Error details:', error); // Agregar detalles del error
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

export const updateUsuarioG=async (req,res)=>{
  console.log(req.body)
  const {id,usuario,correo,genero,telefono,fechaNacimiento,salario,horarioInicio,horarioFin,rol}=req.body.data;
  try {
       
       if(rol==="Administrador"){
           const existAdmin=await Administrador.findByPk(Number(id))
           if(!existAdmin){
               return res.status(404).json({msg:"No encontrado"})
           }
           await Usuario.update({
               Nombre: usuario || existAdmin.Nombre,  
               Correo: correo || existAdmin.Correo,
               sexo:genero || existAdmin.sexo,
               FechaNacimiento: fechaNacimiento || existAdmin.FechaNacimiento,
           },{where:{
               UsuarioID:existAdmin.AdministradorID
           }})
           const miTelefono=await Telefono.findOne({where:{UsuarioID:Number(id)}})
           await Telefono.update({
               Nro:telefono || miTelefono.Nro 
           },{where:{UsuarioID:Number(id)}})
           return res.status(200).json({msg:"Actualizacion Correcta"})
       }


       if(rol==="Empleado"){
        const existEmple=await Empleado.findByPk(Number(id))
        if(!existEmple){
            return res.status(404).json({msg:"No encontrado"})
            
        }

        console.log("si hay")
        await Usuario.update({
            Nombre: usuario || existEmple.Nombre,  
            Correo: correo || existEmple.Correo,
            sexo:genero || existEmple.sexo,
            FechaNacimiento: fechaNacimiento || existEmple.FechaNacimiento
        },{
            where:{
                UsuarioID:existEmple.EmpleadoID
            }
        })

        await Empleado.update({
            Salario:salario|| existEmple.Salario,
            HorarioInicio:horarioInicio ||existEmple.HorarioInicio,
            HoarioFin:horarioFin || existEmple.HorarioFin
        },{
            where:{
                EmpleadoID:existEmple.EmpleadoID
            }
        })

        const miTelefono=await Telefono.findOne({where:{UsuarioID:Number(id)}})
        await Telefono.update({
            Nro:telefono || miTelefono.Nro 
        },{where:{UsuarioID:Number(id)}})
        return res.status(200).json({msg:"Actualizacion Correcta"})
    }


      
    if(rol==="Cliente"){
      const existCli=await Cliente.findByPk(Number(id))
      if(!existCli){
        console.log("eorr")
          return res.status(404).json({msg:"No encontrado"})
      }
      console.log("aqui toy")
      await Usuario.update({
          Nombre: usuario || existCli.Nombre,  // si no se envia mantiene el valor actual 
          Correo: correo || existCli.Correo,

          sexo:genero || existCli.sexo,
          FechaNacimiento: fechaNacimiento || existCli.FechaNacimiento
      },{
          where:{
              UsuarioID:existCli.ClienteID
          }
      })

      const miTelefono=await Telefono.findOne({where:{UsuarioID:Number(id)}})
      await Telefono.update({
          Nro:telefono || miTelefono.Nro 
      },{where:{UsuarioID:Number(id)}})
      return res.status(200).json({msg:"Actualizacion Correcta"})
  }
  } catch (error) {
      res.status(500).json({msg:error.message})
  }
};

export const deleteUsuarioG=async (req,res)=>{
  console.log(req.body)
  const {id}=req.body
  try{
      const infoUser= await Usuario.findByPk(Number(id));
      if(infoUser.RolID==1){
         await Administrador.destroy({where:{ AdministradorID:infoUser.UsuarioID}});
         await Telefono.destroy({where:{UsuarioID:infoUser.UsuarioID}})
         await DetalleDocumento.destroy({where:{UsuarioID:infoUser.UsuarioID}})
         await Usuario.destroy({where:{UsuarioID:infoUser.UsuarioID}})
         return res.status(200).json({msj:"Eliminacion exitosa"})
      }
      if(infoUser.RolID==3){
          await Cliente.destroy({where:{ ClienteID:infoUser.UsuarioID}});
          await Telefono.destroy({where:{UsuarioID:infoUser.UsuarioID}})
          await DetalleDocumento.destroy({where:{UsuarioID:infoUser.UsuarioID}})
          await Usuario.destroy({where:{UsuarioID:infoUser.UsuarioID}})
          return res.status(200).json({msj:"Eliminacion exitosa"})
       }
       if(infoUser.RolID==2){
          await Empleado.destroy({where:{ EmpleadoID:infoUser.UsuarioID}});
          await Telefono.destroy({where:{UsuarioID:infoUser.UsuarioID}})
          await DetalleDocumento.destroy({where:{UsuarioID:infoUser.UsuarioID}})
          await Usuario.destroy({where:{UsuarioID:infoUser.UsuarioID}})
          return res.status(200).json({msj:"Eliminacion exitosa"})
       }
  }catch(error){
      res.status(500).json({err:error.message})
  }
};