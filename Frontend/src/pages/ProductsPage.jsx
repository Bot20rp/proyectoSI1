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
        <div className="containerProduct">
            <div ref={container}>
                    <h1 className="titleProduct">Productos</h1>
                    <input
                        className="buscarProduct"
                        placeholder="Buscar por nombre"
                        onInput={handleSearch}
                    />
                    <button className="openProduct" onClick={openModal}>
                        Nuevo Producto
                    </button>
                    <table className="tableProduct">
                        <thead>
                            <tr className='filasProduct'>
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
                        <tbody ref={tbodyProductos}className='datosProduct'>
                            {productos.map((prod) => (
                                <tr key={prod.id} data-id={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.precio}</td>
                                    <td>{prod.categoria}</td>
                                    <td>{prod.volumen}</td>
                                    <td>{prod.marca}</td>
                                    <td>{prod.estante}</td>
                                    <td className='editProduct'>
                                        <button className='eliminarProduct'onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
                                        <button className='modificarProduct'onClick={() => modificarProducto(prod.id)}>Modificar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
               
            </div>

            <div className="RegistroProduct" ref={modalContainer}>
                <form className="modaEProduct" onSubmit={handleSave}>
                    <h1 className="modalProduct">Registro Producto</h1>
                    <div className="form-idProduct">
                        <label>Id :</label>
                        <input
                          type='number'
                            name="id"
                            value={producto.id}
                            onChange={handleChange}
                            disabled={isEditing}
                        />
                    </div>
                    <div className="form-nombreProduct">
                        <label>Nombre :</label>
                        <input
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleChange}
                        /> <br />
                    </div>
                    <div className="form-precioProduct">
                        <label>Precio :</label>
                        <input
                          type='number'
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-categoriaProduct">
                        <label>Categoria :</label>
                        <input 
                            name="categoria"
                            value={producto.categoria}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-volumenProduct">
                        <label>Volumen :</label>
                        <input
                            type='number'
                            name="volumen"
                            value={producto.volumen}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-marcaProduct">
                        <label>Marca :</label>
                        <input
                            name="marca"
                            value={producto.marca}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-estanteProduct">
                        <label>Estante :</label>
                        <input
                            name="estante"
                            value={producto.estante}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control border-white">
                        <button type="submit" className="saveProduct" >
                            {isEditing ? "Modificar" : "Guardar"}
                        </button>
                    </div>

                    <button type="button" className="closeProduct" onClick={closeModal}>Cerrar</button>
                </form>
            </div>
        </div>
    );
}

export default ProductsPage;