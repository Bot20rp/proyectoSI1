import React, { useState, useRef } from 'react';
import '../css/CategoriaProductPage.css';
import { insertarCategoriaPadre, obtenerCategorias,eliminarCategorias,insertarCategoriaHija} from '../api/auth';


function CategoriaProductPage() {
  // ESTADOS PRINCIPALES
  // Aquí se almacenan todas las categorías y subcategorías
  const [categorias, setCategorias] = useState([]);
  
  // Control para saber si se está editando una categoría o subcategoría
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSubCategoria, setIsEditingSubCategoria] = useState(false);
  
  // Estado para los valores del formulario de categoría o subcategoría
  const [formValues, setFormValues] = useState({
    id: "",
    nombre: "",
    categoria: "", // Solo se usa si es subcategoría
  });

  // Almacena el nombre antiguo para actualizar subcategorías
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

  // REFERENCIAS A MODALES
  const modalSubCategoriaContainer = useRef(null);
  const modalCategoriaContainer = useRef(null);
  const container = useRef(null);

  // FUNCIÓN PARA MANEJAR CAMBIOS EN EL FORMULARIO
  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // GUARDAR DATOS DE CATEGORÍA O SUBCATEGORÍA
  const handleSave = async (e) => {
    e.preventDefault();

    if (isEditing) {
      if (!formValues.categoria) {
        // Editando una categoría
        const updatedCategorias = categorias.map((cat) =>
          cat.id === formValues.id ? { ...cat, nombre: formValues.nombre } : cat
        );
        setCategorias(updatedCategorias);

        // Actualizar subcategorías relacionadas con la categoría modificada
        setCategorias((prevCategorias) =>
          prevCategorias.map((cat) =>
            cat.categoria === formValues.nombreAnterior ? { ...cat, categoria: formValues.nombre } : cat
          )
        );
      } else if (isEditingSubCategoria) {
        // Editando una subcategoría
        const updatedSubcategorias = categorias.map((cat) =>
          cat.id === formValues.id ? formValues : cat
        );
        setCategorias(updatedSubcategorias);
      }

      // Almacenar el nombre anterior y nuevo
      setOldName(formValues.nombreAnterior);
      setNewName(formValues.nombre);

      // Resetear el estado de edición
      setIsEditing(false);
      setIsEditingSubCategoria(false);
    } else {
      // Agregando una nueva categoría o subcategoría
      setCategorias([...categorias, formValues]);
      if(formValues.categoria != null){
        try {
            await insertarCategoriaHija(formValues)
        } catch (error) {
            console.log(error)
        }
      }else{
        try {
            await insertarCategoriaPadre(formValues)
        } catch (error) {
            console.log(error)
        }
      }
    }
    
    resetForm();
    closeModal();
  };

  // ABRIR MODAL DE SUBCATEGORÍA
  const openSubCategoriaModal = () => {
    setFormValues({
      id: "",
      nombre: "",
      categoria: ""
    });
    modalSubCategoriaContainer.current.classList.add('show');
    container.current.classList.add('show2');
  };

  // ABRIR MODAL DE CATEGORÍA
  const openCategoriaModal = () => {
    setFormValues({
      id: "",
      nombre: "",
      categoria: ""
    });
    modalCategoriaContainer.current.classList.add('show');
    container.current.classList.add('show2');
  };

  // CERRAR MODALES Y REINICIAR FORMULARIO
  const closeModal = () => {
    modalSubCategoriaContainer.current.classList.remove('show');
    modalCategoriaContainer.current.classList.remove('show');
    container.current.classList.remove('show2');
    resetForm();
  };

  // REINICIAR FORMULARIO
  const resetForm = () => {
    setFormValues({ id: "", nombre: "", categoria: "" });
    setIsEditing(false);
    setIsEditingSubCategoria(false);
  };

  // ELIMINAR CATEGORÍA O SUBCATEGORÍA
  const handleDelete = async (id, esSubCategoria) => {
    if (esSubCategoria) {
      // Eliminar subcategoría
      setCategorias(categorias.filter((cat) => cat.id !== id || !cat.categoria));
    } else {
      // Eliminar categoría y subcategorías asociadas
      try {
        const eliminar = categorias.find((cat) => cat.id === id && !cat.categoria)
        await eliminarCategorias(eliminar);
        const categoriaAEliminar = categorias.find((cat) => cat.id === id && !cat.categoria);
      setCategorias((prevCategorias) =>
        prevCategorias.filter(
          (cat) => cat.id !== id && cat.categoria !== categoriaAEliminar.nombre
        )
      );
      } catch (error) {
        console.log(error)
      }
      
    }
  };

  // EDITAR CATEGORÍA O SUBCATEGORÍA
  const handleEdit = (id, esSubCategoria) => {
    const categoria = categorias.find((cat) => cat.id === id);
    if (categoria) {
      setFormValues({
        ...categoria,
        nombreAnterior: categoria.nombre // Guardar nombre antiguo para actualizar subcategorías
      });
      if (esSubCategoria) {
        modalSubCategoriaContainer.current.classList.add('show');
        setIsEditingSubCategoria(true);
      } else {
        modalCategoriaContainer.current.classList.add('show');
      }
      container.current.classList.add('show2');
      setIsEditing(true);
    }
  };

  // BÚSQUEDA
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach((row) => {
      const name = row.cells[1].textContent.toLowerCase();
      row.style.display = name.includes(searchTerm) ? "" : "none";
    });
  };

  const listarCategoria = async() =>{
    try {
        const nuevosDatos = await obtenerCategorias();
        console.log(nuevosDatos);
            if (Array.isArray(nuevosDatos.data)) {
                const categoriasNuevas = nuevosDatos.data.map((producto) => ({
                    id: producto.CategoriaID,  
                    nombre: producto.Nombre   
                }));
    
                setCategorias(categoriasNuevas);
            }

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="containerCategoriaProduct" >
      <div ref={container} >
        <h1 className="titleCategoriaPage">Categoria de Productos</h1>
        <input className="buscarCategoria" placeholder="Buscar por nombre" onChange={handleSearch} />
        <button className='openRegisterSubCategoria' onClick={openSubCategoriaModal}>Nueva SubCategoria</button>
        <button className='openRegisterCategoria' onClick={openCategoriaModal}>Nueva Categoria</button>
        <button className='openRegisterCategoria' onClick={listarCategoria}>Listar Categorias Padres</button>

        {/* Mostrar Subcategorías */}
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
            {categorias.filter(cat => cat.categoria).map((cat) => (
              <tr key={cat.id} data-id={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>{cat.categoria}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => handleDelete(cat.id, true)}>Eliminar</button>
                  <button className="btn-modificar" onClick={() => handleEdit(cat.id, true)}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mostrar Categorías */}
        <table className="tableCategoria">
          <thead>
            <tr>
              <th>ID</th>
              <th className='Namecategoria'>Nombre</th>
              <th className='editCategoria'>Edit</th>
            </tr>
          </thead>
          <tbody className="tbody-categoria">
            {categorias.filter(cat => !cat.categoria).map((cat) => (
              <tr key={cat.id} data-id={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>
                  <button className="btn-eliminarCategoria" onClick={() => handleDelete(cat.id, false)}>Eliminar</button>
                  <button className="btn-modificarCategoria" onClick={() => handleEdit(cat.id, false)}>Modificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal SubCategoría */}
      <div className="modalSubCategoriaProduct" ref={modalSubCategoriaContainer}>
        <form className="modalESubCategoriaProduct" onSubmit={handleSave}>
          <h1 className="TitleRegisterSubCategoria">Registrar SubCategoria</h1>
          <input className='formSubCategoria' placeholder="ID" name="id" value={formValues.id} onChange={handleInputChange} required />
          <input className='formSubCategoria' placeholder="Nombre" name="nombre" value={formValues.nombre} onChange={handleInputChange} required />
          <select className='selectSubCategoria' name="categoria" value={formValues.categoria} onChange={handleInputChange} required>
            <option value="">-- Seleccionar Categoria --</option>
            {categorias.filter(cat => !cat.categoria).map((cat) => (
              <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
          <div className="buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={closeModal}>Cerrar</button>
          </div>
        </form>
      </div>

      {/* Modal Categoría */}
      <div className="modalCategoriaProduct" ref={modalCategoriaContainer}>
        <form className="modalECategoriaProduct" onSubmit={handleSave}>
          <h1 className="TitleRegisterCategoria">Registrar Categoria</h1>
          <input className='formCategoria' placeholder="ID" name="id" value={formValues.id} onChange={handleInputChange} required />
          <input className='formCategoria' placeholder="Nombre" name="nombre" value={formValues.nombre} onChange={handleInputChange} required />
          <div className="buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={closeModal}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriaProductPage;
