import React, { useState, useEffect, useRef } from 'react';
import './TallerDeAutos.css';
import articulosTaller from '../Data/articulosTaller';

function TallerDeAutos() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({ atributo1: '', atributo2: '' });
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [todosLosProductos, setTodosLosProductos] = useState([]);

  const productosPorPagina = 8;
  const observadorRef = useRef(null);
  const sentinelaRef = useRef(null);

  useEffect(() => {
    setTodosLosProductos(articulosTaller);
  }, []);

  useEffect(() => {
    if (todosLosProductos.length === 0) return;
    setCargando(true);
    setTimeout(() => {
      const nuevosProductos = todosLosProductos.slice(0, pagina * productosPorPagina);
      setProductos(nuevosProductos);
      setCargando(false);
    }, 500);
  }, [pagina, todosLosProductos]);

  useEffect(() => {
    if (observadorRef.current) observadorRef.current.disconnect();

    observadorRef.current = new IntersectionObserver(
      entradas => {
        if (entradas[0].isIntersecting && !cargando) {
          if (productos.length < todosLosProductos.length) {
            setPagina(p => p + 1);
          }
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    if (sentinelaRef.current) {
      observadorRef.current.observe(sentinelaRef.current);
    }

    return () => {
      if (observadorRef.current) {
        observadorRef.current.disconnect();
      }
    };
  }, [productos, todosLosProductos, cargando]);

  const filtrarProductos = () => {
    const filtrados = articulosTaller.filter(p =>
      p.color.toLowerCase().includes(filtros.atributo1.toLowerCase()) &&
      p.marca.toLowerCase().includes(filtros.atributo2.toLowerCase())
    );
    setTodosLosProductos(filtrados);
    setPagina(1);
    setProductos(filtrados.slice(0, productosPorPagina));
  };

  const limpiarFiltros = () => {
    setFiltros({ atributo1: '', atributo2: '' });
    setTodosLosProductos(articulosTaller);
    setPagina(1);
    setProductos(articulosTaller.slice(0, productosPorPagina));
  };

  const agregarAlCarrito = producto => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const yaExiste = carritoActual.some(p => p.id === producto.id);
    if (!yaExiste) {
      carritoActual.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carritoActual));
      alert(`Agregado al carrito: ${producto.nombre}`);
    } else {
      alert('Este producto ya está en el carrito.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="titulo">Taller De Autos j&j</h1>
        <nav className="nav-botones">
          <button
            className="boton boton-cancelar"
            onClick={() => (window.location.href = '/')}
          >
            Cancelar compra
          </button>
          <button
            className="boton"
            onClick={() => (window.location.href = '/carrito')}
          >
            Completar compra
          </button>
        </nav>
      </header>

      <section className="main-section">
        <aside className="filtros">
          <h2>Filtros</h2>
          <input
            type="text"
            placeholder="Color"
            value={filtros.atributo1}
            onChange={e => setFiltros({ ...filtros, atributo1: e.target.value })}
            className="input-filtro"
          />
          <input
            type="text"
            placeholder="Marca"
            value={filtros.atributo2}
            onChange={e => setFiltros({ ...filtros, atributo2: e.target.value })}
            className="input-filtro"
          />
          <div className="botones-filtros">
            <button onClick={filtrarProductos} className="boton" style={{ flex: 1, marginRight: '0.5rem' }}>
              Filtrar
            </button>
            <button onClick={limpiarFiltros} className="boton" style={{ backgroundColor: '#6c757d', flex: 1 }}>
              Limpiar
            </button>
          </div>
        </aside>

        <main className="lista-productos">
          {productos.map(p => (
            <div key={p.id} className="producto-item">
              <div><strong>{p.nombre}</strong></div>
              <div>Color: {p.color}</div>
              <div>Precio: ${p.precio}</div>
              <div>Marca: {p.marca}</div>
              <button className="boton-ver-detalle" onClick={() => setProductoSeleccionado(p)}>
                Ver Detalle
              </button>
            </div>
          ))}
          {cargando && (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>Cargando...</p>
          )}
          <div ref={sentinelaRef} style={{ height: '1px', gridColumn: '1 / -1' }} />
        </main>

        <aside className="ver-detalle">
          <h2>Ver Detalle</h2>
          {productoSeleccionado ? (
            <>
              <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
              <p><strong>Color:</strong> {productoSeleccionado.color}</p>
              <p><strong>Precio:</strong> ${productoSeleccionado.precio}</p>
              <p><strong>Marca:</strong> {productoSeleccionado.marca}</p>
              <button
                className="boton-agregar"
                onClick={() => agregarAlCarrito(productoSeleccionado)}
              >
                Agregar al carrito
              </button>
            </>
          ) : (
            <p>Selecciona un producto para ver detalle</p>
          )}
        </aside>
      </section>
    </div>
  );
}

export default TallerDeAutos;
