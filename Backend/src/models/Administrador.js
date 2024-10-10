import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import usuario from "./Usuario.js";

const administrador =db.define('Administrador',{
    AdministradorID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model: usuario,
            key: 'UsuarioID'
        }
    }
}, {
    tableName: 'Administrador',
    timestamps: false
})
export default administrador;