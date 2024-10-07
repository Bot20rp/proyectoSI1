import { useAuth } from '../context/AuthContext';
import '../css/UsuarioPage.css';
import { useState } from 'react';

function UsuarioPages() {
  const {tableUser} = useAuth();
  const [datos, setDatos] = useState([]);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [formActualizar, setFormActualizar] = useState({
    id: '',
    usuario: '',
    correo: '',
    telefono: '',
    genero: '',
    rol: ''
  });

  const buscarDatos = async () => {
    try {
      setDatos(tableUser);
    } catch (error) {
      throw new Error('Error al obtener los datos');
    }
  };

  const eliminarDato = (id) => {
    setUsuarioSeleccionado(id);
    setMostrarEliminar(true);  // Mostrar la ventana modal de confirmación
  };

  const confirmarEliminar = () => {
    setDatos(datos.filter(dato => dato.id !== usuarioSeleccionado));
    setMostrarEliminar(false);  // Ocultar la ventana modal después de eliminar
  };

  const actualizarDato = (id) => {
    const usuario = datos.find(dato => dato.id === id);
    setFormActualizar(usuario);
    setMostrarActualizar(true);  // Mostrar la ventana modal de actualización
  };

  const manejarCambio = (e) => {
    setFormActualizar({
      ...formActualizar,
      [e.target.name]: e.target.value
    });
  };

  const confirmarActualizar = () => {
    setDatos(datos.map(dato => (dato.id === formActualizar.id ? formActualizar : dato)));
    setMostrarActualizar(false);  // Ocultar la ventana modal después de actualizar
  };

  return (
    <div className="containerUsuario">
      <div className='ventanaUser'>
        <h1 id='title'>Usuarios</h1>
        <div className="inputUser-group">
          <input type="number" placeholder='NIT/CI' className="inputUser-box" />
          <input placeholder='Nombre' className="inputUser-box" />
          <button className="btn" onClick={buscarDatos}>Buscar</button>
        </div>
        <div className="inputUser-group">
          <select className="inputUser-box">
            <option value="" disabled selected>Listar por Iniciales</option>
            <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="D">E</option>
                    <option value="D">F</option>
                    <option value="D">G</option>
                    <option value="D">H</option>
                    <option value="D">I</option>
                    <option value="D">J</option>
                    <option value="D">K</option>
                    <option value="D">L</option>
                    <option value="D">M</option>
                    <option value="D">N</option>
                    <option value="D">O</option>
                    <option value="D">P</option>
                    <option value="D">Q</option>
                    <option value="D">R</option>
                    <option value="D">S</option>
                    <option value="D">T</option>
                    <option value="D">U</option>
                    <option value="D">V</option>
                    <option value="D">W</option>
                    <option value="D">X</option>
                    <option value="D">Y</option>
                    <option value="D">Z</option>
          </select>
          <select className="inputUser-box">
            <option value="" disabled selected>Listar por Rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Encargado</option>
            <option value="guest">Cliente</option>
          </select>
          <button className="btn" onClick={buscarDatos}>Listar Todos</button>
        </div>
        <div className='listaUsuarios'>
          <table className="table">
            <thead>
              <tr>
                <th className='table-item'>Documento</th>
                <th className='table-item'>Usuario</th>
                <th className='table-item'>Correo</th>
                <th className='table-item'>Teléfono</th>
                <th className='table-item'>Género</th>
                <th className='table-item'>Rol</th>
                <th className='table-item'>Actividad</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id} id='table-user'>
                  <td className='table-item2'>{dato.id}</td>
                  <td className='table-item2'>{dato.usuario}</td>
                  <td className='table-item2'>{dato.correo}</td>
                  <td className='table-item2'>{dato.telefono}</td>
                  <td className='table-item2'>{dato.genero}</td>
                  <td className='table-item2'>{dato.rol}</td>
                  <td className='table-item2' id='option'>
                    <button className="buttonOpcion" onClick={() => eliminarDato(dato.id)}>Eliminar</button>
                    <button className="buttonOpcion" onClick={() => actualizarDato(dato.id)}>Actualizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Confirmar Eliminación */}
      {mostrarEliminar && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro que quieres eliminar este usuario?</h3>
            <button className="btn" onClick={confirmarEliminar}>Sí, eliminar</button>
            <button className="btn" onClick={() => setMostrarEliminar(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal para Actualizar Usuario */}
      {mostrarActualizar && (
        <div className="modal">
          <div className="modal-content">
            <h3>Actualizar Usuario</h3>
            <input
              name="usuario"
              value={formActualizar.usuario}
              onChange={manejarCambio}
              placeholder="Nombre de usuario"
            />
            <input
              name="correo"
              value={formActualizar.correo}
              onChange={manejarCambio}
              placeholder="Correo"
            />
            <input
              name="telefono"
              value={formActualizar.telefono}
              onChange={manejarCambio}
              placeholder="Teléfono"
            />
            <select name="genero" value={formActualizar.genero} onChange={manejarCambio}>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <select name="rol" value={formActualizar.rol} onChange={manejarCambio}>
              <option value="admin">Administrador</option>
              <option value="user">Encargado</option>
              <option value="guest">Cliente</option>
            </select>
            <button className="btn" onClick={confirmarActualizar}>Aceptar</button>
            <button className="btn" onClick={() => setMostrarActualizar(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuarioPages;
