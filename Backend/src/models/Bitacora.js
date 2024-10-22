import {db} from '../config/dbConfig.js';
import { DataTypes } from 'sequelize';
import  Usuario  from './Usuario.js';

const bitacora=db.define('Bitacora',{
    BitacoraID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    UsuarioID:{
        type:DataTypes.INTEGER,
        references:{
            model:Usuario,
            key:'UsuarioID'
        }
    },
    ip:{
        type:DataTypes.STRING(55),
        allowNull:false
    },
    Fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },
    Hora:{
        type:DataTypes.TIME,
        allowNull:false
    },
    Accion:{
        type:DataTypes.STRING(50),
        allowNull:false
    },

},{
    tableName:'Bitacora',
    timestamps:false
})

export const getBita=async ()=>{
    try {
        const data=await db.query( `CALL getBita()`); 
        return data;
    } catch (error) {       
        throw new Error(`Error al llamar al PA ${error.message}`)
    }
}

export default bitacora;
