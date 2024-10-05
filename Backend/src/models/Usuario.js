import { DataTypes } from 'sequelize';
import { db } from '../configDB/dbConfig.js';

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
    }
}, {
    tableName: 'Usuario',
    timestamps: false
});

export default usuario;
