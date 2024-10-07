import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";



const proveedor=db.define('proveed',{
    ProveedorID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true      
    },
    Nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Contacto:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Direccion:{
        type:DataTypes.STRING

    },
    Correo:{
        type:DataTypes.STRING
    }
},{
    tableName: 'Proveedor',
    timestamps: false
})

export default proveedor
