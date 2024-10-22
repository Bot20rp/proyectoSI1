import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bitacora.css';
import instance from '../../src/api/axios' ;       
export const Bitacora = () => {
  const [bitacoras, setBitacoras] = useState([]); // Estado para almacenar los registros de la bitácora
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  // Función para obtener los registros de la bitácora desde el backend
  const fetchBitacoras = async () => {
    try {
      // const response = await axios.get('http://localhost:4000/api/bitacora'); // Cambia la URL según la configuración de tu backend
      const response = await instance.get('/bitacora');

      console.log(response)
      // Verifica si la respuesta es un array antes de establecer el estado
      if (Array.isArray(response.data)) {
        setBitacoras(response.data);

      } else {
        

        console.error('La respuesta no es un array:', response.data);
        setBitacoras([]); // Establece un array vacío si la respuesta no es un array
      }

      setLoading(false); // Desactivar el estado de carga
    } catch (error) {
      console.error('Error al obtener los registros de la bitácora:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBitacoras(); // Llamar a la función cuando el componente se monta ----------
  }, []);

  if (loading) {
    return <div>Cargando los registros de la bitácora...</div>;
  }

  return (
    <div className="bitacora-container">
      <h1>Registros de la Bitácora</h1>
      <table className="bitacora-table">
        <thead>
          <tr>
            <th>BitacoraID</th>
            <th>UsuarioID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Dirección IP</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {/* Verifica si bitacoras es un array antes de mapear */}
          {Array.isArray(bitacoras) && bitacoras.length > 0 ? (
            bitacoras.map((bitacora) => (
              <tr key={bitacora.BitacoraID}>
                <td>{bitacora.BitacoraID}</td>
                <td>{bitacora.UsuarioID}</td>
                <td>{bitacora.Nombre}</td>
                <td>{bitacora.Correo}</td>
                <td>{bitacora.ip}</td>
                <td>{bitacora.fecha}</td> {/* Formato de fecha */}
                <td>{bitacora.Hora}</td>
                <td>{bitacora.Accion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron registros de bitácora.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
