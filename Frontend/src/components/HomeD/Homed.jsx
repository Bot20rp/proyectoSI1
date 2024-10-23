import React, { useState } from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import { Usuarios } from "../../views/Usuarios";
import { Empleados } from "../../views/Empleados";
import { Clientes } from "../../views/Clientes";
import { Proveedores } from "../../views/Proveedores";
import { Reportes } from "../../views/Reportes";
import { HomeDas } from "../../views/HomeDas";
import { Outlet } from "react-router-dom";

import RegisterClientPage from '../../pages/RegisterClientPage'
import ProductsPage from '../../pages/ProductsPage'
import ProveedoresPage from '../../pages/ProveedoresPage'
import UsuarioPage from '../../pages/UsuarioPage'
import CategoriaProductPage from '../../pages/CategoriaProductPage' 
import RegisterEmplead from "../../pages/RegisterEmplead";
import CombosPage from "../../pages/CombosPage";
import "./homed.css";
import LoginPage from "../../pages/LoginPage";
import {Bitacora} from '../../pages/Bitacora'
import {Lote} from '../../pages/Lote'
export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 
  return (
    <div className={`containe12 ${sidebarOpen ? "active12" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Rutas protegidas */}
      <Routes>
        <Route path="/homeda" element={<HomeDas />} /> {/* va ah hacer todas la informacion del usuario admi .. nombre correro ..c ontraseña .... editar  */}
        <Route path="/usuarioGestion" element={<UsuarioPage />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/clientRegister" element={<RegisterClientPage />} />
        <Route path="/proveedorRegister" element={<ProveedoresPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/clienggg" element={<Clientes/>} />
        <Route path="/categoriaproducto" element={<CategoriaProductPage/>}  />
        <Route path="/empleadRegister" element={<RegisterEmplead/>}  />
        <Route path="/login" element={<LoginPage/>}  />
        <Route path="/bitacora" element={<Bitacora/>}  />
        <Route path="/lote" element={<Lote/>}  />
        <Route path="/combos" element={<CombosPage/>}  />
        
      </Routes>




      {/* Esto es para renderizar rutas anidadas si las tienes */}
      <Outlet />
    </div>
  );
};
