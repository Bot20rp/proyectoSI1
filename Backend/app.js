import express from "express";
import morgan from "morgan"
import cors from "cors"; 
import router from "./src/routes/auth.routes.js";
import rundb from "./src/configDB/dbConfig.js";
import cookieParser from 'cookie-parser';

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

export default app;