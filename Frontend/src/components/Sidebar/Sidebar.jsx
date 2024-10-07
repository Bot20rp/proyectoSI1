import React from "react";
import {
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics, MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from "../../assets/react.svg";
import "./sidebar.css";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
      <button className="sidebar-button" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="logo-content">
        <div className="img-content">
        {/*   <img src={logo} alt="logo_licoreria_bunker" /> */}
        </div>
        <h2>{sidebarOpen ? "" : ""}</h2>
      </div>

      {/* Mapeo de enlaces principales */}
      {enlaceprincipal.map(({ label, icon, to }) => (
        <div className="link-container" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `links${isActive ? " active" : ""}`}
          >
            <div className="link-icon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}

      <div className="divider"></div>

      {/* Mapeo de enlaces secundarios */}
      {enlacesecundario.map(({ label, icon, to }) => (
        <div className="link-container" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `links${isActive ? " active" : ""}`}
          >
            <div className="link-icon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}

      <div className="divider"></div>
    </div>
  );
};


const enlaceprincipal = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/dasboard/homeda",
  },
  {
    label: "Usuarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/usuarioGestion",
  },
  {
    label: "Empleados",
    icon: <AiOutlineApartment />,
    to: "/dasboard/empleados",
  },
  {
    label: "Clientes",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/clientRegister",
  },
  {
    label: "Categorias ",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/categoriaproducto",
  },
 
  {
    label: "productos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/products",
  },
  {
    label: "Proveedores",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/proveedorRegister",
  },
];

const enlacesecundario = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/dasboard/null",
  },
  {
    label: "Salir",
    icon: <MdLogout />,
    to: "/dasboard/null",
  },
];