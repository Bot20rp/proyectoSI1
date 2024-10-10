import React, { useRef, useState } from 'react';
import '../css/ProductsPage.css';
import { insertarProducto, obtenerProductos,actualizarProducto} from '../api/auth';

function ProductsPage() {
    const tbodyProductos = useRef(null);

    const [producto, setProducto] = useState({
        id: '',
        Nombre: '',
        Precio: '',
        Categoria: '',
        Volumen: '',
        Marca: '',
        Estante: ''
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
    const agregarProducto = async (producto) => {
        try {
            console.log(producto)
            await insertarProducto(producto)
            setProductos([...productos, producto]);
            resetForm();
        } catch (error) {
            console.log(error)
        }

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
    const handleSave = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await actualizarProducto(producto)
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

    const listar = async()=> {
        try {
            const detos = await obtenerProductos();
            console.log(detos)
            if (Array.isArray(detos.data)) {
                const productosFormateados = detos.data.map((producto) => ({
                    id: producto.ProductoID,  
                    Nombre: producto.Nombre,    
                    Precio: producto.Precio,   
                    Categoria: producto.Catego,
                    Volumen: producto.Vol,
                    Marca: producto.Marc,
                    Estante: producto.Estant
                }));
    
                setProductos(productosFormateados);
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                <button className="openProduct" onClick={listar}>
                    Listar Productos
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
                                    <td>{prod.Nombre}</td>
                                    <td>{prod.Precio}</td>
                                    <td>{prod.Categoria}</td>
                                    <td>{prod.Volumen}</td>
                                    <td>{prod.Marca}</td>
                                    <td>{prod.Estante}</td>
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
                                name="Nombre"
                                value={producto.Nombre}
                                onChange={handleChange}
                                placeholder="Nombre de producto"
                            />
                            <input
                                name="Precio"
                                value={producto.Precio}
                                onChange={handleChange}
                                placeholder="Precio"
                            />
                            <input
                                name="Categoria"
                                value={producto.Categoria}
                                onChange={handleChange}
                                placeholder="Categoría"
                            />
                            <input
                                name="Volumen"
                                value={producto.Volumen}
                                onChange={handleChange}
                                placeholder="Volumen"
                            />
                            <input
                                name="Marca"
                                value={producto.Marca}
                                onChange={handleChange}
                                placeholder="Marca"
                            />
                            <input
                                name="Estante"
                                value={producto.Estante}
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
