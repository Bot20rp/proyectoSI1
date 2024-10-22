import axios from "axios";
import Bitacora,{getBita} from "../models/Bitacora.js";
import { obtenerHoraActual,obtenerFechaactual } from "../libs/bitacora.js";

export const getBitacora=async (req,res)=>{
    try {
        console.log("mostrar listaaaa")
        const mostrarLista= await getBita()
        res.status(200).json(mostrarLista)
    } catch (error) {
        console.log(error);
        res.status(500).json({err:error});
    }
} 

export const createBitacora=async(requesito)=>{
    const {UsuarioID ,message}=requesito ;
    console.log("jopjojojpj")
    console.log(requesito)
   const Hora = obtenerHoraActual() ;
   const Fecha = obtenerFechaactual() ;
    try {
        // const ip = req.ip.replace(/^::ffff:/, '');
        const ipResponse=await axios.get("https://api.ipify.org/?format=json")
        
        await Bitacora.create({
            UsuarioID,ip:ipResponse.data.ip,Fecha,Hora,Accion:`${message}`
        }) 
    } catch (error) {
        //console.log(error);
        throw new Error(`${error.message}`);       
    }
}

 
