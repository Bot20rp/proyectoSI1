import { where } from 'sequelize';
import usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs'; // Asegúrate de que este sea el nombre correcto
import { createAccesToken } from '../libs/tokens.js';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10); // Encriptar la contraseña

    try {
        const user = await usuario.create({
            Nombre: username,
            Correo: email,
            Contrasena: hashPass // Usar la contraseña encriptada
        });
        // res.send('Usuario registrado con éxito');
        console.log(user.UsuarioID);
        const token = await createAccesToken({id: user.UsuarioID});
        console.log(token)
        res.cookie("token",token);
        res.json({
            message: "usuario creado sucess"
        })

        

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existUser = await usuario.findOne({ where: { Correo: email } });
        
        if (!existUser) {
            return res.status(401).json({ mensaje: 'Ese usuario no existe' });
        }

        if (!bcrypt.compareSync(password, existUser.Contrasena)) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Contraseña correcta, generar token
        const token = await createAccesToken({id: existUser.UsuarioID});
        res.cookie("token",token);
        res.json({
            message: "usuario creado sucess"
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

    jwt.verify(token,process.env.JWT_SECRETO,async (err,user)=>{
        if(err) return res.status(401).json({message:"nega token"});

        const userFound = await usuario.findByPk(user.id);
        if(!userFound) return res.status(401).json({message:"nega auto"});

        return res.json({
            if: userFound.UsuarioID
        })
    })

};