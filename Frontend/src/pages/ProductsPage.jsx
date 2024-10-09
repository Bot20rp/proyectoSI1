import React, { useRef, useState } from 'react';
import '../css/ProductsPage.css';

function ProductsPage() {
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
    const [modalVisible, setModalVisible] = useState(false); // Nuevo estado para visibilidad del modal
    const [mostrarActualizar, setMostrarActualizar] = useState(false);

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
            fila.style.display = nombre.includes(textoBuscar) ? '' : 'none';
        });
    };

    // Abrir el modal
    const openModal = () => {
        setModalVisible(true); // Muestra el modal
    };

    // Cerrar el modal
    const closeModal = () => {
        setModalVisible(false); // Oculta el modal
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

    // Manejar cambios en el formulario de actualización
    const manejarCambio = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    // Confirmar actualización
    const confirmarActualizar = () => {
        setMostrarActualizar(false);
    };

    return (
        <div className="containerProduct" >
            <div >
                <h1 className="titleProduct">Productos</h1>
                <input
                    className="buscarProduct"
                    placeholder="Buscar por nombre"
                    onInput={handleSearch}
                />
                <button className="openProduct" onClick={openModal}>
                    Nuevo Producto
                </button>
                <div className="tableContainer">
                    <table className="tableProduct">
                        <thead>
                            <tr className="filasProduct">
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Categoria</th>
                                <th>Volumen</th>
                                <th>Marca</th>
                                <th>Estante</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody ref={tbodyProductos} className="datosProduct">
                            {productos.map((prod) => (
                                <tr key={prod.id} data-id={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.precio}</td>
                                    <td>{prod.categoria}</td>
                                    <td>{prod.volumen}</td>
                                    <td>{prod.marca}</td>
                                    <td>{prod.estante}</td>
                                    <td className="editProduct">
                                        <button className="eliminarProduct" onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
                                        <button className="modificarProduct" onClick={() => modificarProducto(prod.id)}>Modificar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Mostrar el modal cuando modalVisible sea true */}
                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>{isEditing ? "Modificar Producto" : "Nuevo Producto"}</h3>
                            <input
                                name="id"
                                value={producto.id}
                                onChange={handleChange}
                                placeholder="id de producto"
                            />
                            <input
                                name="nombre"
                                value={producto.nombre}
                                onChange={handleChange}
                                placeholder="Nombre de producto"
                            />
                            <input
                                name="precio"
                                value={producto.precio}
                                onChange={handleChange}
                                placeholder="Precio"
                            />
                            <input
                                name="categoria"
                                value={producto.categoria}
                                onChange={handleChange}
                                placeholder="Categoría"
                            />
                            <input
                                name="volumen"
                                value={producto.volumen}
                                onChange={handleChange}
                                placeholder="Volumen"
                            />
                            <input
                                name="marca"
                                value={producto.marca}
                                onChange={handleChange}
                                placeholder="Marca"
                            />
                            <input
                                name="estante"
                                value={producto.estante}
                                onChange={handleChange}
                                placeholder="Estante"
                            />
                            <button className="btn" onClick={handleSave}>
                                {isEditing ? "Modificar" : "Guardar"}
                            </button>
                            <button className="btn" onClick={closeModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default ProductsPage;
