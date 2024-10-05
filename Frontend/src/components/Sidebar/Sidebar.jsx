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
    <>
      <div className={`sidebar-container  ${sidebarOpen ? "open" : "closed"}`}>
        <button className="sidebar-button" onClick={ModSidebaropen}>
          <AiOutlineLeft />
        </button>
        <div className="logo-content">
          <div className="img-content">
            <img src={logo} alt="logo_licoreria_bunker" />
          </div>
          <h2>{sidebarOpen && "holaaa"}</h2>
        </div>
        {enlaceprincipal.map(({ label, icon, to }) => {
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? `active` : ``}`}
            >
              <div className="link-icon"> {icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>;
        })}

        <div className="divider"></div>
        {enlacesecundario.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? ` active` : ``}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}
        {/* esto es una linea que divide , lo podremos usar mas adelante si lo queremos hacer por permiso */}
        <div className="divider"></div>

        <div className="divider"></div>
      </div>
    </>
  );
};
const enlaceprincipal = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Usuarios",
    icon: <MdOutlineAnalytics />,
    to: "/users",
  },
  {
    label: "empleados",
    icon: <AiOutlineApartment />,
    to: "/empleados",
  },
  {
    label: "clientes",
    icon: <MdOutlineAnalytics />,
    to: "/clientes",
  },
  {
    label: "proveedores",
    icon: <MdOutlineAnalytics />,
    to: "/proveedores",
  },
  {
    label: "Reportes",
    icon: <MdOutlineAnalytics />,
    to: "/reportes",
  },
];
const enlacesecundario = [
  {
    label: "Configuración",
    icon: <AiOutlineSetting />,
    to: "/null",
  },
  {
    label: "Salir",
    icon: <MdLogout />,
    to: "/null",
  },
];
