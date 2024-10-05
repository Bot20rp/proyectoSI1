import React, { useState } from "react";
import { MyRoutes } from "../../routers/routes";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Light } from "./style/Themes"; // Importa solo el tema claro
import { ThemeProvider } from "styled-components";
import './dasboard.css'; // Importa el archivo CSS
export const Dasboard = () => {


  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={Light}> {/* Usar solo el tema claro */}
      <BrowserRouter>
        <div className={`container ${sidebarOpen ? "active" : ""}`}>
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <MyRoutes />
        </div>
      </BrowserRouter>
    </ThemeProvider>

  )
  
}
