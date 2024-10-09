import axios from "./axios"


export const registerRequest = user => axios.post(`/clientReg`,user)
export const loginRequest = user => axios.post(`/login`,user)
export const obtenerRequest = () => { return axios.get('/obtener')};
export const verityTokenResquest = () => axios.get('/verify')

// gestion proveedor
export const registrarProveedorRequest = user => axios.post(`/proveedor`,user);
export const extraerID = user => axios.post(`/proveedor/ex`,user);
export const eliminarProveedor = user => axios.delete(`/proveedor/delete`,{ data : user, // El cuerpo de la solicitud se pasa aquí
    headers: {
        'Content-Type': 'application/json', // Asegúrate de que el Content-Type es correcto
    },
});
export const actualizarProveedores = user => axios.patch(`/proveedor/update`,{data :user ,
    headers: {
        'Content-Type': 'application/json', // Asegúrate de que el Content-Type es correcto
    },
});
export const obtenerRequestProveedor = () => {return axios.get(`/proveedor`);}

//Gestion Empleado
export const registerEmpleado = user => axios.post(`/empleadoreg`,user)