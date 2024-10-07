import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';
import Rol from './Rol.js';

const usuario = db.define('Usuario', {
    UsuarioID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Correo: {
        
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    Contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Sexo:{
        type:DataTypes.CHAR,
        allowNull:false
    },
    FechaNacimiento:{
        type:DataTypes.DATE,
        allowNull: false
    },
    RolID:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Usuario',
    timestamps: false
});

usuario.belongsTo(Rol, {
    foreignKey: 'RolID',  // El nombre de la columna que apunta a Rol en la tabla Usuario
    Nombre: 'rol',            // Alias que puedes usar para incluir Rol
  });

export default usuario;
