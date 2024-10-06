import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verityTokenResquest } from "../api/auth";
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
  
    const signin = async (user) => {
      try {
        const res = await loginRequest(user);
        setEsAutenticado(true)
        setUser(res.data)
        setRol(res.data.user.rol)
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() =>{
      async function checkLogin ( ) {
        const cookies = Cookies.get();
        console.log(cookies.token);
  
        if(!cookies.token){
          setEsAutenticado(false);
          setLoading(false);
          setRol(null);
          return setUser(null)
        }
        try {
          const res = await verityTokenResquest(cookies.token);
          if(!res.data){
            setEsAutenticado(false);
            setLoading(false);
            return;
          }
          
          setEsAutenticado(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
            setEsAutenticado(false);
            setLoading(false);
            setRol(null);
            setUser(null);
        }
      }
      checkLogin();
    },[])
  
    return (
      <AuthContext.Provider value={{ signin, user,esAutenticado ,loading, rol}}>
        {children}
      </AuthContext.Provider>
    );
  };