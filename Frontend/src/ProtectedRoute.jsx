import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({requiredRole}) {

  console.log("1")

    const {loading, esAutenticado,rol } = useAuth();
    if(!loading && !esAutenticado) return <Navigate to ='/login' replace/>

    if (requiredRole && rol !== requiredRole) {
      return <h1>No tienes permiso para acceder a esta página.</h1>; // Puedes ajustar este mensaje o redirigir a otra página
    }

  return (
    <Outlet/>    
  )
}

export default ProtectedRoute
