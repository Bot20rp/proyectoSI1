import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import usuario from "./Usuario.js";


const telefono= db.define('telefono',{
    TelefonoID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Nro:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    UsuarioID:{
        type:DataTypes.INTEGER,
        references:{
             model:usuario,
             key:'UsuarioID'
        }
    }
},{
    tableName:'Telefono',
    timestamps:false
})
usuario.hasMany(telefono,{foreignKey:'UsuarioID'})
export default telefono;