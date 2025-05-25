import React, { useState, useEffect } from 'react';
import './FormularioCompra.css';
import { useNavigate } from 'react-router-dom';

function FormularioCompra() {
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [expiracion, setExpiracion] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nombreTitular, setNombreTitular] = useState('');
  const [presupuesto, setPresupuesto] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const presupuestoGuardado = localStorage.getItem('presupuestoMaximo');
    const totalGuardado = localStorage.getItem('totalCompra');
    if (presupuestoGuardado) setPresupuesto(Number(presupuestoGuardado));
    if (totalGuardado) setTotalCompra(Number(totalGuardado));
  }, []);

  const limpiarCampos = () => {
    setNumeroTarjeta('');
    setExpiracion('');
    setCodigo('');
    setNombreTitular('');
  };

  const confirmarCompra = () => {
    if (!numeroTarjeta || !expiracion || !codigo || !nombreTitular) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (!/^\d{16}$/.test(numeroTarjeta)) {
      alert('El número de tarjeta debe tener 16 dígitos numéricos.');
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiracion)) {
      alert('La fecha de expiración debe tener el formato MM/AA.');
      return;
    }

    if (!/^\d{3,4}$/.test(codigo)) {
      alert('El código de seguridad debe tener 3 o 4 dígitos.');
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombreTitular)) {
      alert('El nombre del titular solo debe contener letras y espacios.');
      return;
    }

    if (totalCompra > presupuesto) {
      alert(`El total ($${totalCompra}) supera el presupuesto máximo permitido ($${presupuesto}).`);
      return;
    }

    alert('Compra confirmada');
    localStorage.removeItem('carrito');
    localStorage.removeItem('totalCompra');
    navigate('/');
  };

  return (
    <div className="formulario-compra-container">
      <h2>Formulario de Pago</h2>
      <p className="resumen-compra">
        Presupuesto máximo: ${presupuesto} | Total de la compra: ${totalCompra}
      </p>

      <button
        type="button"
        className="boton-volver"
        onClick={() => navigate('/carrito')}
      >
        Volver al Carrito
      </button>

      <form
        className="formulario-compra"
        autoComplete="on"
        onSubmit={(e) => e.preventDefault()}
      >
        <label>
          Número de Tarjeta
          <input
            type="text"
            value={numeroTarjeta}
            onChange={(e) => setNumeroTarjeta(e.target.value)}
            placeholder="16 dígitos"
            autoComplete="cc-number"
          />
        </label>

        <label>
          Fecha de Expiración (MM/AA)
          <input
            type="text"
            value={expiracion}
            onChange={(e) => setExpiracion(e.target.value)}
            placeholder="MM/AA"
            autoComplete="cc-exp"
          />
        </label>

        <label>
          Código de Seguridad
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="3 o 4 dígitos"
            autoComplete="cc-csc"
          />
        </label>

        <label>
          Nombre del Titular
          <input
            type="text"
            value={nombreTitular}
            onChange={(e) => setNombreTitular(e.target.value)}
            autoComplete="cc-name"
            placeholder="Solo letras y espacios"
          />
        </label>

        <div className="botones-formulario">
          <button
            type="button"
            onClick={limpiarCampos}
            className="boton-limpiar"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={confirmarCompra}
            className="boton-confirmar"
          >
            Confirmar Compra
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioCompra;
