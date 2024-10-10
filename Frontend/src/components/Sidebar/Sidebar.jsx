import React from "react";
import {
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useAuth } from "../../context/AuthContext"; // Importa useAuth

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth(); // Usa el método logout
  const navigate = useNavigate(); // Hook para redirección

  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout(); // Llama a logout del contexto
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
      <button className="sidebar-button" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="logo-content">
        <div className="img-content">
          {/* Si no necesitas el logo, puedes eliminar esta parte */}
          {/* <img src={logo} alt="logo_licoreria_bunker" /> */}
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
          {label === "Salir" ? (
            <button onClick={handleLogout} className="links">
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </button>
          ) : (
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          )}
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
    to: "/dasboard/homeda", // Corregido a "dashboard"
  },
  {
    label: "Usuarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/usuarioGestion", // Corregido a "dashboard"
  },
  {
    label: "Empleados",
    icon: <AiOutlineApartment />,
    to: "/dasboard/empleadRegister", // Corregido a "dashboard"
  },
  {
    label: "Clientes",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/clientRegister", // Corregido a "dashboard"
  },
  {
    label: "Categorias",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/categoriaproducto", // Corregido a "dashboard"
  },
  {
    label: "Productos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/products", // Corregido a "dashboard"
  },
  {
    label: "Proveedores",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/proveedorRegister", // Corregido a "dashboard"
  },
];

const enlacesecundario = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/dasboard/null", // Corregido a "dashboard"
  },
  {
    label: "Salir",
    icon: <MdLogout />,
    // No necesita `to`, ya que el botón manejará el logout manualmente
  },
];
