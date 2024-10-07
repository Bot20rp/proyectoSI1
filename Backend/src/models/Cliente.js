import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import usuario from "./Usuario.js";

const cliente =db.define('Cliente',{
    ClienteID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: usuario,
            key: 'UsuarioID'
        }
    }
}, {
    tableName: 'Cliente',
    timestamps: false
})
usuario.hasOne(cliente, {
    foreignKey: 'ClienteID',
    onDelete: 'CASCADE',  // Esto asegura que se elimine en cascada
    onUpdate: 'CASCADE'
});
cliente.belongsTo(usuario, { foreignKey: 'ClienteID' });
export default cliente;
