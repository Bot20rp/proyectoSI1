import React, { useRef, useState } from 'react';
import '../css/ProveedoresPage.css';
import { registrarProveedorRequest, extraerID, eliminarProveedor,actualizarProveedores } from '../api/auth';
import { useAuth } from '../context/AuthContext';

function ProveedoresPage() {
    const modalContainer = useRef(null);
    const container = useRef(null);
    const tbodyproveedors = useRef(null);
    const [proveedor, setproveedor] = useState({
        id: '',
        Nombre: '',
        Direccion: '',
        Contacto: '',
    });
    const [proveedors, setproveedors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const {tableProveedor,cargarDatosProveedores} = useAuth();

    // Manejar los cambios en el formulario
    const handleChange = (e) => {
        setproveedor({
            ...proveedor,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la búsqueda de proveedors
    const handleSearch = (e) => {
        const textoBuscar = e.target.value.toLowerCase();
        const filas = tbodyproveedors.current.querySelectorAll('tr');
        filas.forEach(fila => {
            const nombre = fila.cells[1].textContent.toLowerCase();
            if (nombre.indexOf(textoBuscar) !== -1) {
                fila.style.display = '';
            } else {
                fila.style.display = 'none';
            }
        });
    };

    // Abrir y cerrar modal
    const openModal = () => {
        modalContainer.current.classList.add('show');
        container.current.classList.add('show2');
    };




    const closeModal = () => {
        modalContainer.current.classList.remove('show');
        container.current.classList.remove('show2');
        resetForm();
    };

    // Agregar proveedor a la tabla
    const agregarproveedor = async (proveedor) => {
        try {
            const res = await registrarProveedorRequest(proveedor);
            if (res.data) {
                const proveID = await extraerID(proveedor);
                setproveedor(prevProveedor => ({
                    ...prevProveedor,
                    id: proveID.data.ProveedorID
                }));

                setproveedors([...proveedors, { ...proveedor, id: proveID.data.ProveedorID }]);
                resetForm();
            }
        } catch (error) {
            console.log(error)
        }
    };
    // Resetear formulario
    const resetForm = () => {
        setproveedor({
            id: '',
            Nombre: '',
            Direccion: '',
            Contacto: '',
        });
        setIsEditing(false);
    };

    // Función para actualizar un proveedor
    const actualizarProveedor = async (proveedorModificado) => {
        try {
            // Envía la solicitud para actualizar el proveedor
            await actualizarProveedores(proveedorModificado); // Asegúrate de que esta función haga una solicitud PUT o PATCH
            const nuevosproveedors = proveedors.map(p => 
                p.id === proveedorModificado.id ? proveedorModificado : p
            );
            setproveedors(nuevosproveedors);
            resetForm(); // Reinicia el formulario
        } catch (error) {
            console.error("Error al actualizar el proveedor:", error);
            // Manejo de errores
        }
    };


    // Guardar o modificar proveedor
    const handleSave = (e) => {
        e.preventDefault();
        if (isEditing) {
            actualizarProveedor(proveedor); // Llama a la función de actualizar
        } else {
            agregarproveedor(proveedor);
        }
        closeModal();
    };

    // Eliminar proveedor
    const eliminarproveedor = async (id) => {

        const datos = { id }; // Crea el objeto con el ID a eliminar
        console.log(datos);

        try {
            // Usa Axios para enviar la solicitud DELETE
            await eliminarProveedor(datos); // Suponiendo que 'eliminarProveedor' es una función que usa Axios

            // Filtra los proveedores y actualiza el estado
            const nuevosproveedors = proveedors.filter(p => p.id !== id);
            setproveedors(nuevosproveedors);
            await cargarDatosProveedores();
        } catch (error) {
            console.error("Error al eliminar el proveedor:", error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    // Modificar proveedor
    const modificarproveedor = async (id) => {
        const proveedorAModificar = proveedors.find(p => p.id === id);
        if (proveedorAModificar) {
            try {
                console.log(proveedorAModificar);
                // await actualizarProveedor(proveedorAModificar);
                setproveedor(proveedorAModificar);
                setIsEditing(true);
                openModal();
            } catch (error) {
                console.error("Error al eliminar el proveedor:", error);
            }
        }
    };

    const listarDatos = () =>{
        try {
            console.log(tableProveedor)
            setproveedors(tableProveedor);
          } catch (error) {
            throw new Error('Error al obtener los datos');
          }
    };

    return (
        <div className="containerProveedor">
            <div ref={container}>
                <h1 className="titleProveedor">Proveedores</h1>
                <input
                    className="buscarProveedor"
                    placeholder="Buscar por nombre"
                    onInput={handleSearch}
                />
                <button className="openProveedor" onClick={() => { resetForm(); openModal(); }}>
                    Nuevo Proveedor
                </button>
                <button className="openProveedor" onClick= {listarDatos} >
                    Listar Proveedores
                </button>
                <table className="tableProveedor">
                    <thead>
                        <tr className='filasProveedor'>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody ref={tbodyproveedors} className='datosProveedor'>
                        {proveedors.map((prod) => (
                            <tr key={prod.id} data-id={prod.id}>
                                <td>{prod.id}</td>
                                <td className='tdNombreProveedor'>{prod.Nombre}</td>
                                <td>{prod.Direccion}</td>
                                <td>{prod.Contacto}</td>
                                <td className='editProveedor'>
                                    <button className='eliminarProveedor' onClick={() => eliminarproveedor(prod.id)}>Eliminar</button>
                                    <button className='modificarProveedor' onClick={() => modificarproveedor(prod.id)}>Modificar1</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="RegistroProveedor" ref={modalContainer}>
                <form className="modaEProveedor" onSubmit={handleSave}>
                    <h1 className="modalProveedor">Registro Proveedor</h1>
                    <div className="form-nombreProveedor">
                        <label>Nombre :</label>
                        <input
                            name="Nombre"
                            value={proveedor.Nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-direccionProveedor">
                        <label>Direccion :</label>
                        <input
                            name="Direccion"
                            value={proveedor.Direccion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-telefonoProveedor">
                        <label>Telefono:</label>
                        <input
                            name="Contacto"
                            type='number'
                            value={proveedor.Contacto}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control border-white">
                        <button type="submit" className="saveProveedor">
                            {isEditing ? "Modificar123" : "Guardar"}
                        </button>
                    </div>

                    <button type="button" className="closeProveedor" onClick={closeModal}>Cerrar</button>
                </form>
            </div>
        </div>
    );
}

export default ProveedoresPage;
