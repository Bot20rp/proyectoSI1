import { Usuario, Documento, Telefono, DetalleDocumento ,Empleado} from '../models/AsociacionDocumento.js';
import Rol from '../models/Rol.js';

export const obtenerUsuariosConDetalles= async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['UsuarioID', 'Nombre', 'Correo', 'Sexo'], // Incluyendo el UsuarioID
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
      horarioFin: usuario.Empleado?.HorarioFin || 'No registrado' // Mostrar horario laboral o 'No registrado'
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