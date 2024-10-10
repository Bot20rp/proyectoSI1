import Usuario from '../models/Usuario.js';
import Documento from '../models/Documento.js';
import DetalleDocumento from '../models/DetalleDocumento.js';
import bcrypt from 'bcryptjs';
import Telefono from '../models/Telefono.js';


export const registrarCliente = async (req, res) => {
  const { Nombre, Correo, Contrasena, FechaNacimiento, Sexo,NumeroDocumento,telefono} = req.body;

  // Validar que todos los campos necesarios estén presentes
  if (!Nombre || !Correo || !Contrasena || !FechaNacimiento || !Sexo || !NumeroDocumento || !telefono) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(Contrasena, 10);

    // Verificar si el tipo de documento ya existe
    const tipoDocumento = await Documento.findOne({
      where: { TipoDocumento: 'Cédula de Identidad' },
    });

    if (!tipoDocumento) {
      return res.status(400).json({ message: 'El tipo de documento no existe' });
    }

    // Crear el usuario
    const nuevoUsuario = await Usuario.create({
      Nombre,
      Correo,
      Contrasena: hashedPassword,
      FechaNacimiento,
      Sexo,
      RolID: 3, // Rol de cliente
    });

    // Asociar el número de documento al usuario
    await DetalleDocumento.create({
        UsuarioID: nuevoUsuario.UsuarioID,
        DocumentoID: tipoDocumento.DocumentoID,
        NumeroDocumento,
      });

    await Telefono.create({
        Nro: telefono,  // Usar el número de teléfono proporcionado
        UsuarioID: nuevoUsuario.UsuarioID,
    });

    res.status(201).json({
      message: 'Cliente registrado exitosamente',
      usuario: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el cliente' });
  }
};