import express from "express";
import morgan from "morgan"
import cors from "cors"; 
import router from "./src/routes/auth.routes.js";
import routerCli from "./src/routes/cliente.routes.js";
import rundb from "./src/config/dbConfig.js";
import cookieParser from 'cookie-parser';
import routerUser from "./src/routes/usuario.routes.js";
import routerProv from "./src/routes/proveedor.routes.js";
import routerEmp from "./src/routes/empleado.routes.js";
import routerCat from "./src/routes/categoria.routes.js";
import routerProd from "./src/routes/producto.routes.js";

const app = express();
rundb();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}
));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api",router);
app.use("/api",routerCli);
app.use("/api",routerUser);
app.use("/api",routerProv);
app.use("/api",routerEmp);
app.use("/api",routerCat);
app.use("/api",routerProd);

export default app;