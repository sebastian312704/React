import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

const ResumenCompra = () => {
  const { carrito } = useContext(CarritoContext);

  return (
    <div className="p-4 bg-white rounded">
      <h2>Resumen de Compra</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Marca</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item, idx) => (
              <tr key={idx}>
                <td>{item.nombre}</td>
                <td>{item.color}</td>
                <td>${item.precio}</td>
                <td>{item.marca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResumenCompra;