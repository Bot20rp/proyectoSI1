import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config( {path:'.env'})
export const db =new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port:process.env.DB_PORT,
        dialect:'mysql',
        
        define:{
            timeStamps:false
        },
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
         }
    }
)

const rundb=async()=>{
    try {
        await db.authenticate();
        db.sync();
        console.log('Conexión establecida con éxito.');
      } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
      }
}
export default rundb