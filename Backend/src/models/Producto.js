import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
const producto= db.define('producto',{
    ProductoID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    Nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Precio:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    MarcaID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Marca',
            key:'MarcaID'
        }
    },
    EstanteID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Estante',
            Key:'EstanteID'
        }
    },
    CategoriaID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:'Categoria',
            Key:'CategoriaID'
        }
    }
},{
    tableName:'Producto',
    timestamps:false
})


export const createProducto=async ({Nombre,Precio,Volumen,Marca,Estante,Categoria})=>{
    try {
        const data= db.query(`CALL createProducto('${Nombre}','${Number(Precio)}','${Volumen}','${Marca}','${Estante}','${Number(Categoria)}') `)
        return data;
    } catch (error) {
        throw new Error(`Error al llamar al PA ${error.message}`)
    }
}

export const obtProducto=async ()=>{
    try {
        const data= db.query(`CALL getProducto() `)
        return data;
    } catch (error) {
        throw new Error(`Error al llamar al PA ${error.message}`)
    }
}

export const actProducto= async ({id,Nombre,Precio,Volumen,Marca,Estante, Categoria})=>{
    try {
        const data= db.query(`CALL updProducto('${Number(id)}','${Nombre}','${Number(Precio)}','${Volumen}','${Marca}','${Estante}','${Categoria=1}') `)
        return data;
    } catch (error) {
        throw new Error(`Error al llamar al PA ${error.message}`)
    }
}

export default producto;