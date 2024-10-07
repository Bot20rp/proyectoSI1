
import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";



const Documento = db.define('Documento', {
  DocumentoID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  TipoDocumento: {
    type: DataTypes.STRING(50),
    allowNull: false,  // Tipo de documento: 'Cédula de Identidad', 'NIT', etc.
  },
}, {
  timestamps: false,  // No agregar columnas de timestamps automáticamente
  tableName: 'Documento',  // Nombre de la tabla en la base de datos
});

export default Documento;