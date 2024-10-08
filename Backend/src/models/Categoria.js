import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";


const Categoria = db.define('Categoria', {
  CategoriaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  CategoriaPadreID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categoria',  // Referencia a la misma tabla
      key: 'CategoriaID',
    },
  },
}, {
  tableName: 'Categoria',
  timestamps: false,
});
Categoria.hasMany(Categoria, { as: 'Subcategorias', foreignKey: 'CategoriaPadreID' });
Categoria.belongsTo(Categoria, { as: 'CategoriaPadre', foreignKey: 'CategoriaPadreID' });

module.exports = Categoria;
