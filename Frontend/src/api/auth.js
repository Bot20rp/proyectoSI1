import axios from "./axios"

//GESTION USUARIO

export const registerRequest = user => axios.post(`/clientReg`,user) 
export const loginRequest = user => axios.post(`/login`,user)
export const logoutRequest= ()=>axios.post('/logout')
export const obtenerRequest = () => { return axios.get('/obtener')};
export const verityTokenResquest = () => axios.get('/verify')
export const actualizarUsuario = user => axios.patch(`/usuario/actualizar`,{data :user ,
    headers: {
        'Content-Type': 'application/json', 
    },
});
export const eliminarUsuario = user => axios.delete('/usuario/del',{ data : user,
    headers: {
        'Content-Type': 'application/json', 
    },
})


// GESTION PROVEEDOR

export const registrarProveedorRequest = user => axios.post(`/proveedor`,user);
export const extraerID = user => axios.post(`/proveedor/ex`,user);
export const eliminarProveedor = user => axios.delete(`/proveedor/delete`,{ data : user, 
    headers: {
        'Content-Type': 'application/json', 
    },
});
export const actualizarProveedores = user => axios.patch(`/proveedor/update`,{data :user ,
    headers: {
        'Content-Type': 'application/json', 
    },
});
export const obtenerRequestProveedor = () => {return axios.get(`/proveedor`);}


//Gestion Empleado

export const registerEmpleado = user => axios.post(`/empleadoreg`,user)

//Gestion Categoria

export const insertarCategoriaPadre = user => axios.post(`/categoriaPadre`,{ data: user,
    headers:{
        'Content-Type': 'application/json', 
    }
})
export const insertarCategoriaHija = user => axios.post(`/categoriaHija`,{ data: user,
    headers:{
        'Content-Type': 'application/json', 
    }
})
export const actualizarCategoria = user => axios.patch('/catmodificar',user);
export const obtenerCategorias = () => {return axios.get(`/getCategoria`);};
export const eliminarCategorias = user => axios.delete(`/DeleteCategoria`,{data : user,
    headers :{
        'Content-Type': 'application/json', 
    }
});


//GESTION PRODUCTO
export const insertarProducto = user => axios.post(`/productoReg`, { data: user ,
    headers:{
        'Content-Type': 'application/json', 
    },
});



export const obtenerProductos = () => {return axios.get(`/producto`)};

export const actualizarProducto = user => axios.patch(`/producto/actualizar`,{data :user ,
    headers:{
        'Content-Type': 'application/json', 
    },
});


// BITACORA 
/* export const bitacoraa = user => axios.post(`/crearbitacora`, { data: user ,
    headers:{
        'Content-Type': 'application/json', 
    },
}) */;

export const bitacoraa = () => axios.get(`/bitacora`) 