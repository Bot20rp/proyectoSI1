import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest,logoutRequest, verityTokenResquest,obtenerRequest,obtenerRequestProveedor } from "../api/auth";
import Cookies from 'js-cookie';


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [esAutenticado, setEsAutenticado] = useState(false);
    const [loading,setLoading] = useState(true);
    const [rol,setRol] = useState(null);
    const [tableUser,setTableUser] = useState([]);
    const [tableProveedor,setTableProveedor] = useState([]);
  
    const signin = async (user) => {
      try {
        const res = await loginRequest(user);
        setEsAutenticado(true)
        setUser(res.data)
        setRol(res.data.user.rol)
        console.log("hola")

        if(res.data.user.rol === 'Administrador'|| res.data.user.rol ==='Cliente'){
          console.log("si entre")
          cargarDatos();
          cargarDatosProveedores();
        }else{
          console.log("Acceso denegado para cargar datos user")
        }
      } catch (error) {
        console.error(error);
      }
    };

    /*  ---------   */
    const logout =async () => {
      const cookies = Cookies.get();
      await logoutRequest(cookies);
      setEsAutenticado(false);
      setUser(null);           
      setRol(null);            
      setTableUser([]);        
      // navigate('/login');    
    };

    const cargarDatos = async () =>{
      try {
        const respuesta = await obtenerRequest();
        if(respuesta.status !== 200){
          throw new Error('Error Obtener datos')
        }
        const datosNuevos = respuesta.data.usuarios.map(usuarios => ({
          id: usuarios.id, // Ajusta según la estructura de tu respuesta
          usuario: usuarios.usuario,
          correo: usuarios.correo,
          telefono: usuarios.telefono,
          genero: usuarios.genero,
          rol: usuarios.rol, // Suponiendo que `Rol` es un objeto que contiene el nombre
          salario:  usuarios.salario,
          horarioInicio: usuarios.horarioInicio,
          horarioFin : usuarios.horarioFin
        }));
        

        setTableUser(datosNuevos);
        console.log(datosNuevos);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    const cargarDatosProveedores = async () =>{
      try {
        const respuesta = await obtenerRequestProveedor();
        console.log(respuesta.data)
        if(respuesta.status !== 200){
          throw new Error('Error Obtener datos')
        }
        const datosNuevos = respuesta.data.map(data => ({
          id: data.ProveedorID, 
          Nombre: data.Nombre,
          Contacto: data.Contacto,
          Direccion : data.Direccion
        }));
        

        setTableProveedor(datosNuevos);
        console.log(datosNuevos);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
  
    useEffect(() => {
      async function checkLogin() {
        const cookies = Cookies.get();
        const token = cookies.token;
  
        if (!token) {
          setEsAutenticado(false);
          setLoading(false);
          setRol(null);
          setUser(null);
          return;
        }
  
        try {
          const res = await verityTokenResquest(token);
          if (!res.data) {
            setEsAutenticado(false);
            setLoading(false);
            return;
          }
  
          // Guardar datos en el estado
          setEsAutenticado(true);
          setUser(res.data);
          setLoading(false);
          setRol(res.data.user.rol);
  
          // Cargar datos si el rol es "Administrador" o "encargado"
          if (res.data.user.rol === 'Administrador' || res.data.user.rol === 'Cliente') {
             cargarDatos();
             cargarDatosProveedores();
          }

        } catch (error) {
          console.error("Error al verificar el token:", error);
          setEsAutenticado(false);
          setLoading(false);
          setRol(null);
          setUser(null);
        }
      }
  
      checkLogin();
    }, []);
  
    return (
      <AuthContext.Provider value={{ 
        signin, 
        user,
        esAutenticado, 
        loading,
        rol,
        tableUser,
        tableProveedor,
        cargarDatosProveedores,
        logout
      }}>
        {children}
      </AuthContext.Provider>
    );
  };