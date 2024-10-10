import React, { useState, useRef } from 'react';
import '../css/CategoriaProductPage.css';
import { insertarCategoriaPadre, actualizarCategoria } from '../api/auth';

function CategoriaProductPage() {
    const [categorias, setCategorias] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSubCategoria, setIsEditingSubCategoria] = useState(false); // Control para edición de subcategoría
    const [formValues, setFormValues] = useState({
        id: "",
        Nombre: "",
        categoria: "",
    });

    const modalSubCategoriaContainer = useRef(null);
    const modalCategoriaContainer = useRef(null);
    const container = useRef(null);

    // Manejo de cambios en el formulario
    const handleInputChange = (e) => {
        try {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
        } catch (error) {
            console.log(error);
        }
    };

    // Función para guardar nuevas categorías o subcategorías
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (!isEditing) {
                await insertarCategoriaPadre(formValues); // Llamada al backend para insertar nueva categoría
                setCategorias([...categorias, formValues]);
                console.log('Datos guardados:', formValues);
            }
        } catch (error) {
            console.log('Error al guardar:', error);
        }
        resetForm();
        closeModal();
    };

    // Función para modificar categorías o subcategorías
    const handleModify = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                if (!formValues.categoria) {
                    // Modificar categoría
                    await actualizarCategoria(formValues); // Llamada al backend para actualizar categoría
                    const updatedCategorias = categorias.map((cat) =>
                        cat.id === formValues.id ? { ...cat, Nombre: formValues.Nombre } : cat
                    );
                    setCategorias(updatedCategorias);
                    // Actualizar las subcategorías relacionadas con la categoría modificada
                    setCategorias((prevCategorias) =>
                        prevCategorias.map((cat) =>
                            cat.categoria === formValues.NombreAnterior ? { ...cat, categoria: formValues.Nombre } : cat
                        )
                    );
                } else if (isEditingSubCategoria) {
                    // Modificar subcategoría
                    await actualizarCategoria(formValues); // Llamada al backend para actualizar subcategoría
                    const updatedSubcategorias = categorias.map((cat) =>
                        cat.id === formValues.id ? formValues : cat
                    );
                    setCategorias(updatedSubcategorias);
                }
            }
        } catch (error) {
            console.log('Error al modificar:', error);
        }
        resetForm();
        closeModal();
    };

    // Confirmar antes de modificar
    const confirmModify = (id, esSubCategoria) => {
        if (window.confirm('¿Estás seguro de que deseas modificar este registro?')) {
            handleEdit(id, esSubCategoria); // Llamada a la función de edición
        }
    };

    // Abrir el modal de subcategoría
    const openSubCategoriaModal = () => {
        resetForm();
        modalSubCategoriaContainer.current.classList.add('show');
        container.current.classList.add('show2');
    };

    // Abrir el modal de categoría
    const openCategoriaModal = () => {
        resetForm();
        modalCategoriaContainer.current.classList.add('show');
        container.current.classList.add('show2');
    };

    // Cerrar modales y reiniciar formulario
    const closeModal = () => {
        modalSubCategoriaContainer.current.classList.remove('show');
        modalCategoriaContainer.current.classList.remove('show');
        container.current.classList.remove('show2');
        resetForm();
    };

    // Reiniciar los valores del formulario
    const resetForm = () => {
        setFormValues({ id: "", Nombre: "", categoria: "" });
        setIsEditing(false);
        setIsEditingSubCategoria(false);
    };

    // Eliminar un registro
    const handleDelete = (id, esSubCategoria) => {
        if (esSubCategoria) {
            // Eliminar solo si es subcategoría
            setCategorias(categorias.filter((cat) => cat.id !== id || !cat.categoria));
        } else {
            // Eliminar la categoría y las subcategorías asociadas
            const categoriaAEliminar = categorias.find((cat) => cat.id === id && !cat.categoria);
            setCategorias((prevCategorias) =>
                prevCategorias.filter(
                    (cat) => cat.id !== id && cat.categoria !== categoriaAEliminar.Nombre
                )
            );
        }
    };

    // Manejar edición y abrir el formulario correspondiente
    const handleEdit = (id, esSubCategoria) => {
        const categoria = categorias.find((cat) => cat.id === id);
        if (categoria) {
            setFormValues({
                ...categoria,
                NombreAnterior: categoria.Nombre // Guardar el Nombre anterior para actualizar subcategorías
            });
            if (esSubCategoria) {
                // Es subcategoría, abre el modal de subcategoría
                modalSubCategoriaContainer.current.classList.add('show');
                setIsEditingSubCategoria(true); // Marca que estamos editando una subcategoría
            } else {
                // Es categoría, abre el modal de categoría
                modalCategoriaContainer.current.classList.add('show');
            }
            container.current.classList.add('show2');
            setIsEditing(true);
        }
    };

    // Manejo de búsqueda
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll("tbody tr").forEach((row) => {
            const name = row.cells[1].textContent.toLowerCase();
            row.style.display = name.includes(searchTerm) ? "" : "none";
        });
    };

    return (
        <div className="containerCategoriaProduct">
            <div ref={container}>

                <h1 className="titleCategoriaPage">Categoria de Productos</h1>
                <input
                    className="buscarCategoria"
                    placeholder="Buscar por Nombre"
                    onChange={handleSearch}
                />
                <button className='openRegisterSubCategoria' onClick={openSubCategoriaModal}>
                    Nueva SubCategoria
                </button>
                <button className='openRegisterCategoria' onClick={openCategoriaModal}>
                    Nueva Categoria
                </button>

                {/* Resto del código para tablas y modales */}
                <table className="tableSubCategoria">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='NameSubcategoria'>Nombre</th>
                            <th>Categoria</th>
                            <th className='editSubCategoria'>Edit</th>
                        </tr>
                    </thead>
                    <tbody className="tbody-subcategoria">
                        {categorias
                            .filter(cat => cat.categoria) // Mostrar solo subcategorías
                            .map((cat) => (
                                <tr key={cat.id} data-id={cat.id}>
                                    <td>{cat.id}</td>
                                    <td>{cat.Nombre}</td>
                                    <td>{cat.categoria}</td>
                                    <td>
                                        <button
                                            className="btn-eliminar"
                                            onClick={() => handleDelete(cat.id, true)} // Eliminar subcategoría
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            className="btn-modificar"
                                            onClick={() => handleEdit(cat.id, true)} // Abrir formulario de subcategoría
                                        >
                                            Modificar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <table className="tableCategoria">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className='Namecategoria'>Nombre</th>
                            <th className='editCategoria'>Edit</th>
                        </tr>
                    </thead>
                    <tbody className="tbody-categoria">
                        {categorias
                            .filter(cat => !cat.categoria) // Mostrar solo categorías
                            .map((cat) => (
                                <tr key={cat.id} data-id={cat.id}>
                                    <td>{cat.id}</td>
                                    <td>{cat.Nombre}</td>
                                    <td>
                                        <button
                                            className="btn-eliminarCategoria"
                                            onClick={() => handleDelete(cat.id, false)} // Eliminar categoría y subcategorías asociadas
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            className="btn-modificarCategoria"
                                            onClick={() => handleEdit(cat.id, false)} // Abrir formulario de categoría
                                        >
                                            Modificar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para SubCategoría */}
            <div className="modalSubCategoriaProduct" ref={modalSubCategoriaContainer}>
                <form className="modalESubCategoriaProduct" onSubmit={handleSave}>
                    <h1 className="TitleRegisterSubCategoria">Registrar SubCategoria</h1>
                    <div className="form-control1">
                        <label htmlFor="id"></label>
                        <input
                            className='formSubCategoria'
                            placeholder="ID"
                            name="id"
                            value={formValues.id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control2">
                        <label htmlFor="Nombre"></label>
                        <input
                            className='formSubCategoria'
                            placeholder="Nombre"
                            name="Nombre"
                            value={formValues.Nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control3">
                        <label htmlFor="categoria"></label>
                        <select
                            className="formSubCategoria"
                            name="categoria"
                            value={formValues.categoria}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccionar categoria</option>
                            {categorias
                                .filter(cat => !cat.categoria) // Mostrar solo categorías
                                .map((cat) => (
                                    <option key={cat.id} value={cat.Nombre}>{cat.Nombre}</option>
                                ))}
                        </select>
                    </div>
                    <div className="button-saveSubCategoria">
                        <button className="saveSubCategoria" type="submit">
                            Guardar
                        </button>
                        <button className="closeRegisterSubCategoria" onClick={closeModal}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal para Categoría */}
            <div className="modalCategoriaProduct" ref={modalCategoriaContainer}>
                <form className="modalECategoriaProduct" onSubmit={handleSave}>
                    <h1 className="TitleRegisterCategoria">Registrar Categoria</h1>
                    <div className="form-control1">
                        <label htmlFor="id"></label>
                        <input
                            className='formCategoria'
                            placeholder="ID"
                            name="id"
                            value={formValues.id}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control2">
                        <label htmlFor="Nombre"></label>
                        <input
                            className='formCategoria'
                            placeholder="Nombre"
                            name="Nombre"
                            value={formValues.Nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="button-saveCategoria">
                        <button className="saveCategoria" type="submit">
                            Guardar
                        </button>
                        <button className="closeRegisterCategoria" onClick={closeModal}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoriaProductPage;


