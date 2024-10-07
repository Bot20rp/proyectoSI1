// models/detalleDocumento.js
import { db } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import usuario from "./Usuario.js";
import Documento from "./Documento.js";

const DetalleDocumento = db.define('DetalleDocumento', {
    UsuarioID: {
        type: DataTypes.INTEGER,
        references: {
            model: usuario,
            key: 'UsuarioID'
        },
        primaryKey: true
    },
    DocumentoID: {
        type: DataTypes.INTEGER,
        references: {
            model: Documento,
            key: 'DocumentoID'
        },
        primaryKey: true
    },
    NumeroDocumento: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'DetalleDocumento',
    timestamps: false
});

export default  DetalleDocumento;