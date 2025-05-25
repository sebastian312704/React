import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrito.css';

function Carrito() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const datos = localStorage.getItem('carrito');
    if (datos) {
      setProductos(JSON.parse(datos));
    }
  }, []);

  const eliminarProducto = (index) => {
    const nuevos = [...productos];
    nuevos.splice(index, 1);
    setProductos(nuevos);
    localStorage.setItem('carrito', JSON.stringify(nuevos));
  };

  const total = productos.reduce((acc, p) => acc + p.precio, 0);

  const realizarCompra = () => {
    localStorage.setItem('totalCompra', total); 
    navigate('/formulario-compra'); 
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de Compras</h2>
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="carrito-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Color</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, index) => (
                <tr key={index}>
                  <td>{p.nombre}</td>
                  <td>{p.marca}</td>
                  <td>{p.color}</td>
                  <td>${p.precio}</td>
                  <td>
                    <button
                      className="carrito-boton-eliminar"
                      onClick={() => eliminarProducto(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="carrito-total">Total: ${total}</p>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button className="carrito-boton-volver" onClick={() => navigate('/taller')}>
          Volver al catálogo
        </button>
        {productos.length > 0 && (
          <button className="carrito-boton-comprar" onClick={realizarCompra}>
            Realizar compra
          </button>
        )}
      </div>
    </div>
  );
}

export default Carrito;
