import { useAuth } from '../context/AuthContext';
import '../css/UsuarioPage.css';
import { useState } from 'react';
import { actualizarUsuario,eliminarUsuario } from '../api/auth';

function UsuarioPages() {
  const { tableUser, user } = useAuth();
  const [usuarioInterfaz,setUsuarioInterfaz] = useState(null);
  const [datos, setDatos] = useState([]);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [formActualizar, setFormActualizar] = useState({
    id: '',
    suario: '',
    correo: '',
    telefono: '',
    genero: '',
    fechaNacimiento:'', 
    rol: '',
    salario:'',
    horarioInicio: '',
    horarioFin:''
  });

  

  const buscarDatos = async () => {
    try {
      console.log(tableUser)
      setDatos(tableUser);
    } catch (error) {
      throw new Error('Error al obtener los datos');
    }
  };

  const eliminarDato = (id) => {
    setUsuarioSeleccionado(id);
    setMostrarEliminar(true);  // Mostrar la ventana modal de confirmación
  };

  const confirmarEliminar = async () => {
    try {
      await eliminarUsuario({id: usuarioSeleccionado})
      setDatos(datos.filter(dato => dato.id !== usuarioSeleccionado));
      setMostrarEliminar(false);  // Ocultar la ventana modal después de eliminar
    } catch (error) {
      console.log(error)
    }

  };

  const actualizarDato = (id) => {
    const usuario = datos.find(dato => dato.id === id);
    setFormActualizar(usuario);
    setMostrarActualizar(true);  // Mostrar la ventana modal de actualización
    setUsuarioInterfaz(usuario.rol)
  };

  const manejarCambio = (e) => {
    setFormActualizar({
      ...formActualizar,
      [e.target.name]: e.target.value
    });
  };

  const confirmarActualizar = async () => {
    try {
      
      console.log("soy formularioActualizar" )
      console.log(formActualizar)
      await actualizarUsuario(formActualizar)
      setDatos(datos.map(dato => (dato.id === formActualizar.id ? formActualizar : dato)));
      setMostrarActualizar(false);  // Ocultar la ventana modal después de actualizar
    } catch (error) {
      console.log(error)
    }

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
          <select className="inputUser-box" defaultValue="">
            <option value="" disabled>Listar por Iniciales</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="N">N</option>
            <option value="O">O</option>
            <option value="P">P</option>
            <option value="Q">Q</option>
            <option value="R">R</option>
            <option value="S">S</option>
            <option value="T">T</option>
            <option value="U">U</option>
            <option value="V">V</option>
            <option value="W">W</option>
            <option value="X">X</option>
            <option value="Y">Y</option>
            <option value="Z">Z</option>
          </select>
          <select className="inputUser-box" defaultValue="">
            <option value="" disabled>Listar por Rol</option>
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
            <label htmlFor="nombre">Nombre</label>
              <input
                name="usuario"
                value={formActualizar.usuario}
                onChange={manejarCambio}
                placeholder="Teléfono"
              />
              <label htmlFor="correo">Correo</label>
            <input
              name="correo"
              value={formActualizar.correo}
              onChange={manejarCambio}
              placeholder="Correo"
            />
            <label htmlFor="telefono">Telefono</label>
              <input
                name="telefono"
                value={formActualizar.telefono}
                onChange={manejarCambio}
                placeholder="Teléfono"
              />
              <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
            <input
            
              type='date'
              name="fechaNacimiento"
              value={formActualizar.fechaNacimiento}
              onChange={manejarCambio}
              placeholder="fecha Nacimiento"
            />
            {usuarioInterfaz === 'Empleado' && (
              <div>
                <label htmlFor="salario">Salario</label>
              <input
                name="salario"
                value={formActualizar.salario}
                onChange={manejarCambio}
                placeholder="salario"
              />
              </div>
            )}
            {usuarioInterfaz === 'Empleado' && (
              <div>
                <label htmlFor="horarioInicio">Hora Entrada</label>
              <input
              type='time'
                name="horarioInicio"
                value={formActualizar.horarioInicio}
                onChange={manejarCambio}
                placeholder="horarioInicio"
              />
              </div>
            )}
            {usuarioInterfaz === 'Empleado' && (
              <div>
                <label htmlFor="horarioFin">Horario Salida</label>
              <input
              type='time'
                name="horarioFin"
                value={formActualizar.horarioFin}
                onChange={manejarCambio}
                placeholder="horarioFIn"
              />
              </div>
            )}
            <select name="genero" value={formActualizar.genero} onChange={manejarCambio}>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <select name="rol" value={formActualizar.rol} onChange={manejarCambio}>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Encargado</option>
              <option value="Cliente">Cliente</option>
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
