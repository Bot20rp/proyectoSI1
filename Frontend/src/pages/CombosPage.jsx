import React, { useState, useEffect } from 'react';
import '../css/Combos.css';

function CombosPage() {
    const [productos, setProductos] = useState([
        { id: "1", nombre: "Sprite 500ml", precio: "12" },
        { id: "2", nombre: "Sprite 1L", precio: "15" },
        { id: "3", nombre: "Coca-Cola 500ml", precio: "13" },
        { id: "4", nombre: "Coca-Cola 1L", precio: "18" },
        { id: "5", nombre: "Del Valle Durazno 500ml", precio: "16" },
        { id: "6", nombre: "Del Valle Manzana 1L", precio: "20" },
        { id: "7", nombre: "Paceña 330ml", precio: "14" },
        { id: "8", nombre: "Paceña 620ml", precio: "22" },
        { id: "9", nombre: "Agua Vital 500ml", precio: "8" },
        { id: "10", nombre: "Agua Vital 1L", precio: "12" },
        { id: "11", nombre: "Pepsi 500ml", precio: "11" },
        { id: "12", nombre: "Pepsi 1.5L", precio: "17" },
        { id: "13", nombre: "Fanta Naranja 500ml", precio: "12" },
        { id: "14", nombre: "Fanta Naranja 1L", precio: "16" },
        { id: "15", nombre: "Red Bull 250ml", precio: "20" },
        { id: "16", nombre: "Monster Energy 473ml", precio: "25" },
        { id: "17", nombre: "Lipton Té Limón 500ml", precio: "10" },
        { id: "18", nombre: "Lipton Té Durazno 1L", precio: "14" },
        { id: "19", nombre: "7-Up 500ml", precio: "12" },
        { id: "20", nombre: "7-Up 1L", precio: "15" },
        { id: "21", nombre: "Combo Familiar: 2x Coca-Cola 1L + 2x Fanta Naranja 500ml + 4x Hamburguesas con papas", precio: "120" },
    ]);

    const [busquedaId, setBusquedaId] = useState('');
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [productosEnCombo, setProductosEnCombo] = useState([]); // Productos agregados a la tabla del combo
    const [totalSinDescuento, setTotalSinDescuento] = useState(0); // Nuevo estado para el total sin descuento

    // Función para actualizar el total sin descuento
    useEffect(() => {
        const total = productosEnCombo.reduce((sum, product) => {
            return sum + (product.precio * product.cantidad);
        }, 0);
        setTotalSinDescuento(total);
    }, [productosEnCombo]); // Se recalcula cada vez que cambia la lista de productos o sus cantidades

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const nuevoValor = Math.max(1, value);
        const nuevoProducto = [...productosEnCombo];
        nuevoProducto[index][name] = nuevoValor;
        setProductosEnCombo(nuevoProducto);
    };

    const handleRemonveProduct = (index) => {
        const newProducts = productosEnCombo.filter((_, i) => i !== index);
        setProductosEnCombo(newProducts);
    };

    const buscarProductoPorId = (event) => {
        const value = event.target.value;
        setBusquedaId(value);

        if (value.length > 0) {
            const resultados = productos.filter(product => product.id.startsWith(value));
            setSugerencias(resultados);
        } else {
            setSugerencias([]);
        }
    };

    const buscarProductoPorNombre = (event) => {
        const value = event.target.value;
        setBusquedaNombre(value);

        if (value.length >= 3) {
            const resultados = productos.filter(product => product.nombre.toLowerCase().startsWith(value.toLowerCase()));
            setSugerencias(resultados);
        } else {
            setSugerencias([]);
        }
    };

    const seleccionarProducto = (producto) => {
        // Verificar si el producto ya está en el combo
        const productoExistente = productosEnCombo.find(p => p.id === producto.id);

        if (productoExistente) {
            // Si el producto ya existe, sumamos la cantidad
            const productosActualizados = productosEnCombo.map(p =>
                p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
            );
            setProductosEnCombo(productosActualizados);
        } else {
            // Si no existe, lo agregamos con cantidad inicial de 1
            setProductosEnCombo([...productosEnCombo, { ...producto, cantidad: 1 }]);
        }
        setSugerencias([]);
        setBusquedaId('');
        setBusquedaNombre('');
    };

    const obtener = () => {
        console.log(productosEnCombo)
    }

    return (
        <div className='contenedorCombo'>
            <div className='comboContenedor'>
                <h2>AGREGAR NUEVO COMBO</h2>
                <input type="text" placeholder='Ingresar el nombre del combo' />

                <div className='ParaCombo'>
                    <input
                        type="text"
                        placeholder='ID del producto'
                        value={busquedaId}
                        onChange={buscarProductoPorId}
                    />
                    <input
                        type="text"
                        placeholder='Buscar producto'
                        value={busquedaNombre}
                        onChange={buscarProductoPorNombre}
                    />

                    {sugerencias.length > 0 && (
                        <ul className='sugerencias'>
                            {sugerencias.map((producto, index) => (
                                <li key={index} onClick={() => seleccionarProducto(producto)}>
                                    {producto.id} - {producto.nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <h2>Descripción del Combo</h2>
                <div className='tablaCombo'>
                    <div className='tablaScroll'>
                        <table>
                            <thead>
                                <tr>
                                    <th>CodigoP</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosEnCombo.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.nombre}</td>
                                        <td>{product.precio}</td>
                                        <td>
                                            <input
                                                type='number'
                                                name='cantidad'
                                                value={product.cantidad}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleRemonveProduct(index)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='costos'>
                    <h3>Total sin Descuento</h3>
                    <input type="number" value={totalSinDescuento} readOnly /> {/* Aquí se muestra el total sin descuento */}
                    <h3>Nuevo Precio</h3>
                    <input type="number" />
                </div>
                <div className='duracionCombo'>
                    <h3>Fecha Inicio</h3>
                    <input type="date" />
                    <h3>Fecha Fin</h3>
                    <input type="date" />
                </div>

                <button onClick={obtener}>Agregar</button>
                <h2>CONSULTAR COMBOS EXISTENTES</h2>
            </div>
        </div>
    );
}

export default CombosPage;
