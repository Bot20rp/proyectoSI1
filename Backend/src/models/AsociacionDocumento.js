import Usuario from './Usuario.js';
import Documento from './Documento.js';
import Telefono from './Telefono.js';
import DetalleDocumento from './DetalleDocumento.js';
import Empleado from './Empleado.js'; 


// Relación entre Usuario y DetalleDocumento
Usuario.hasMany(DetalleDocumento, { foreignKey: 'UsuarioID', as: 'DetalleDocumentos' });
DetalleDocumento.belongsTo(Usuario, { foreignKey: 'UsuarioID', as: 'Usuario' });

// Relación entre Documento y DetalleDocumento
Documento.hasMany(DetalleDocumento, { foreignKey: 'DocumentoID', as: 'DetalleDocumentos' });
DetalleDocumento.belongsTo(Documento, { foreignKey: 'DocumentoID', as: 'Documento' });

// Relación entre Usuario y Telefono
Usuario.hasMany(Telefono, { foreignKey: 'UsuarioID', as: 'Telefonos' });
Telefono.belongsTo(Usuario, { foreignKey: 'UsuarioID', as: 'Usuario' });

Usuario.hasOne(Empleado, {
    foreignKey: 'EmpleadoID',  // Debe ser 'EmpleadoID' en lugar de 'UsuarioID'
    as: 'Empleado',
});
Empleado.belongsTo(Usuario, {
    foreignKey: 'EmpleadoID',  // Debe ser 'EmpleadoID' aquí también
    targetKey: 'UsuarioID', // Asegúrate de que sea 'UsuarioID'
});

export {Usuario, Documento, Telefono, DetalleDocumento,Empleado};