import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

const Rol = db.define('Rol', {
  RolID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,  // Nombre del rol, por ejemplo: 'Admin', 'Cliente'
  },
}, {
  timestamps: false,  // No agregar columnas de timestamps automáticamente
  tableName: 'Rol',  // Nombre de la tabla en la base de datos
});


export default Rol;