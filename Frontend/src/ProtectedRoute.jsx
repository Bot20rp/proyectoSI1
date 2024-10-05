import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {

  console.log("1")

    const {loading, esAutenticado } = useAuth();
    if(!loading && !esAutenticado) return <Navigate to ='/login' replace/>

  return (
    <Outlet/>    
  )
}

export default ProtectedRoute
