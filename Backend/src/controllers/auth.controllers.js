import { where } from 'sequelize';
import usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs'; // Asegúrate de que este sea el nombre correcto
import { createAccesToken } from '../libs/tokens.js';
import jwt from 'jsonwebtoken'
import Rol from '../models/Rol.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existUser = await usuario.findOne({ 
            where: { Correo: email },
            attributes: ['UsuarioID', 'Correo', 'Contrasena'],
            include: { model: Rol, attributes: ['Nombre'] }  // Cambia 'Nombre' a ['Nombre']
        });
        
        if (!existUser) {
            return res.status(401).json({ mensaje: 'Ese usuario no existe' });
        }


        console.log(existUser.UsuarioID)
        console.log(existUser.Correo)
        console.log(existUser.Rol.Nombre)

        if (!bcrypt.compareSync(password, existUser.Contrasena)) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Contraseña correcta, generar token
        const token = await createAccesToken({id: existUser.UsuarioID});
        res.cookie("token",token);
        res.json({
            message: "usuario creado sucess",
            user: {
                id: existUser.UsuarioID,
                email: existUser.Correo,
                rol: existUser.Rol.Nombre
            }
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

export const logout = (req,res) => {
    res.cookie('token',"",{
        expires: new Date(0),
    })
    return res.sendStatus(200);
}

export const verifyToken = async (req,res) => {
    console.log(req.cookies)
    const {token} = req.cookies

    if(!token) return res.status(401).json({message:"nega token"});

    jwt.verify(token,process.env.JWT_SECRETO,async (err,user)=>
        {
        if(err) return res.status(401).json({message:"nega token"});
        
        const existUserToken = await usuario.findOne({ 
            where: { UsuarioID: user.id },
            attributes: ['UsuarioID', 'Nombre', 'Contrasena'],
            include: { model: Rol, attributes: ['Nombre'] }  // Cambia 'Nombre' a ['Nombre']
        });

        console.log(existUserToken)
        if(!existUserToken) return res.status(401).json({message:"no hay usuario"});

        return res.json({

            user: {
                id: existUserToken.UsuarioID,
                email: existUserToken.Nombre,
                rol: existUserToken.Rol.Nombre
            }

        })
    })

};