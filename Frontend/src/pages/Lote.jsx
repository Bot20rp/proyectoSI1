
import React, { useState } from 'react';
import './lote.css';

export const Lote= () => {
  const [productos, setProductos] = useState([]);

  return (
    /* contenedor principal  */
    <div className="container">
      {/* Gestión de Lote .. aqui habra un crud */}
      <div className="gestion-lote">
        <h2>GESTION DE LOTE</h2>
        <div className="buscar-producto">
          <label></label>
          <input type="text" placeholder="Buscar producto que contendrá el combo" />
        </div>
{/* aui va el consultarrrarr */}
        <div className="descripcion-lotes">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th className="highlighted">Fecha Ini</th>
                <th className="highlighted">Fecha Venc</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {/* mapeadooooo ...consumir api  */}
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.fechaIni}</td>
                  <td>{producto.fechaVenc}</td>
                  <td>{producto.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="guardar-btn">Guardar</button>
      </div>

      {/* Consultar Lotes */}
      <div className="consultar-lotes">
        <h2>CONSULTAR DE LOS LOTES DE PRODUCTOS</h2>
        <button className="ordenar-btn">ACOMODAR POR MENOR TIEMPO</button>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th className="highlighted">Nombre</th>
              <th>Cantidad</th>
              <th>Fecha Vencimiento</th>
              <th>Diferencia de Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí también puedes mapear los productos */}
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.fechaVenc}</td>
                <td>{producto.diferenciaTiempo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

