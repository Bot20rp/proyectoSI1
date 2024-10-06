import React, { useRef, useState, useEffect } from 'react';
import '../css/ProductsPage.css'

function ProductsPage() {
    const modalContainer = useRef(null);
    const container = useRef(null);
    const tbodyProductos = useRef(null);
    const [producto, setProducto] = useState({
        id: '',
        nombre: '',
        precio: '',
        categoria: '',
        volumen: '',
        marca: '',
        estante: ''
    });
    const [productos, setProductos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // Manejar los cambios en el formulario
    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la búsqueda de productos
    const handleSearch = (e) => {
        const textoBuscar = e.target.value.toLowerCase();
        const filas = tbodyProductos.current.querySelectorAll('tr');
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

    // Agregar producto a la tabla
    const agregarProducto = (producto) => {
        setProductos([...productos, producto]);
        resetForm();
    };

    // Resetear formulario
    const resetForm = () => {
        setProducto({
            id: '',
            nombre: '',
            precio: '',
            categoria: '',
            volumen: '',
            marca: '',
            estante: ''
        });
        setIsEditing(false);
    };

    // Guardar o modificar producto
    const handleSave = (e) => {
        e.preventDefault();
        if (isEditing) {
            const nuevosProductos = productos.map(p => p.id === producto.id ? producto : p);
            setProductos(nuevosProductos);
        } else {
            agregarProducto(producto);
        }
        closeModal();
    };

    // Eliminar producto
    const eliminarProducto = (id) => {
        const nuevosProductos = productos.filter(p => p.id !== id);
        setProductos(nuevosProductos);
    };

    // Modificar producto
    const modificarProducto = (id) => {
        const productoAModificar = productos.find(p => p.id === id);
        if (productoAModificar) {
            setProducto(productoAModificar);
            setIsEditing(true);
            openModal();
        }
    };

    return (
        <div className="containerr">
            <div ref={container}>
                <div className="row">
                    <div className="col">
                        <div className="header-container">
                            <h1 className="title">Productos</h1>
                            <input 
                                type="text" 
                                className="input-buscar" 
                                placeholder="Buscar por nombre"
                                onInput={handleSearch}
                            />
                        </div>
                        <button className="open" onClick={openModal}>
                            Nuevo Producto
                        </button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Categoria</th>
                                    <th>Volumen</th>
                                    <th>Marca</th>
                                    <th>Estante</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody ref={tbodyProductos}>
                                {productos.map((prod) => (
                                    <tr key={prod.id} data-id={prod.id}>
                                        <td>{prod.id}</td>
                                        <td>{prod.nombre}</td>
                                        <td>{prod.precio}</td>
                                        <td>{prod.categoria}</td>
                                        <td>{prod.volumen}</td>
                                        <td>{prod.marca}</td>
                                        <td>{prod.estante}</td>
                                        <td>
                                            <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
                                            <button onClick={() => modificarProducto(prod.id)}>Modificar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modalContainer" ref={modalContainer}>
                <form className="modalE" id="modalE" onSubmit={handleSave}>
                    <h1 className="modal_RP">Registro Producto</h1>
                    <div className="form-control1">
                        <label>Id :</label>
                        <input 
                            type="text" 
                            id="id" 
                            name="id" 
                            value={producto.id} 
                            onChange={handleChange}
                            disabled={isEditing}
                        />
                    </div>
                    <div className="form-control2">
                        <label>Nombre :</label>
                        <input 
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            value={producto.nombre} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control3">
                        <label>Precio :</label>
                        <input 
                            type="number" 
                            id="precio" 
                            name="precio" 
                            value={producto.precio} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control4">
                        <label>Categoria :</label>
                        <input 
                            type="text" 
                            id="categoria" 
                            name="categoria" 
                            value={producto.categoria} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control5">
                        <label>Volumen :</label>
                        <input 
                            type="number" 
                            id="volumen" 
                            name="volumen" 
                            value={producto.volumen} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control6">
                        <label>Marca :</label>
                        <input 
                            type="text" 
                            id="marca" 
                            name="marca" 
                            value={producto.marca} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control7">
                        <label>Estante :</label>
                        <input 
                            type="text" 
                            id="estante" 
                            name="estante" 
                            value={producto.estante} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control border-white">
                        <button type="submit" className="save" >
                            {isEditing ? "Modificar" : "Guardar"}
                        </button>
                    </div>

                    <button type="button" className="close" onClick={closeModal}>Cerrar</button>
                </form>
            </div>
        </div>
    );
}

export default ProductsPage;