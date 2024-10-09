import React, { useRef, useState } from 'react';
import '../css/ProveedoresPage.css';

function ProveedoresPage() {
    const modalContainer = useRef(null);
    const container = useRef(null);
    const tbodyproveedors = useRef(null);
    const [proveedor, setproveedor] = useState({
        id: '',
        nombre: '',
        direccion: '',
        telefono: '',
    });
    const [proveedors, setproveedors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

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
    const agregarproveedor = (proveedor) => {
        setproveedors([...proveedors, proveedor]);
        resetForm();
    };

    // Resetear formulario
    const resetForm = () => {
        setproveedor({
            id: '',
            nombre: '',
            direccion: '',
            telefono: '',
        });
        setIsEditing(false);
    };

    // Guardar o modificar proveedor
    const handleSave = (e) => {
        e.preventDefault();
        if (isEditing) {
            const nuevosproveedors = proveedors.map(p => p.id === proveedor.id ? proveedor : p);
            setproveedors(nuevosproveedors);
        } else {
            agregarproveedor(proveedor);
        }
        closeModal();
    };

    // Eliminar proveedor
    const eliminarproveedor = (id) => {
        const nuevosproveedors = proveedors.filter(p => p.id !== id);
        setproveedors(nuevosproveedors);
    };

    // Modificar proveedor
    const modificarproveedor = (id) => {
        const proveedorAModificar = proveedors.find(p => p.id === id);
        if (proveedorAModificar) {
            setproveedor(proveedorAModificar);
            setIsEditing(true);
            openModal();
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
                                <td className='tdNombreProveedor'>{prod.nombre}</td>
                                <td>{prod.direccion}</td>
                                <td>{prod.telefono}</td>
                                <td className='editProveedor'>
                                    <button className='eliminarProveedor' onClick={() => eliminarproveedor(prod.id)}>Eliminar</button>
                                    <button className='modificarProveedor' onClick={() => modificarproveedor(prod.id)}>Modificar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="RegistroProveedor" ref={modalContainer}>
                <form className="modaEProveedor" onSubmit={handleSave}>
                    <h1 className="modalProveedor">Registro Proveedor</h1>
                    <div className="form-idProveedor">
                        <label>Id :</label>
                        <input
                            type='number'
                            name="id"
                            value={proveedor.id}
                            onChange={handleChange}
                            disabled={isEditing}
                        />
                    </div>
                    <div className="form-nombreProveedor">
                        <label>Nombre :</label>
                        <input
                            name="nombre"
                            value={proveedor.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-direccionProveedor">
                        <label>Direccion :</label>
                        <input
                            name="direccion"
                            value={proveedor.direccion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-telefonoProveedor">
                        <label>Telefono:</label>
                        <input
                            name="telefono"
                            value={proveedor.telefono}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control border-white">
                        <button type="submit" className="saveProveedor">
                            {isEditing ? "Modificar" : "Guardar"}
                        </button>
                    </div>

                    <button type="button" className="closeProveedor" onClick={closeModal}>Cerrar</button>
                </form>
            </div>
        </div>
    );
}

export default ProveedoresPage;
