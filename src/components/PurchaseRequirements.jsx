import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PurchaseRequirements.css';

const PurchaseRequirements = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    presupuesto: '',
    direccion: '',
    entrega: '',
  });

  const [errores, setErrores] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const erroresTemporales = [];

    if (!form.nombre.trim()) erroresTemporales.push('El nombre es obligatorio.');
    if (!form.presupuesto || Number(form.presupuesto) <= 0) erroresTemporales.push('El presupuesto debe ser mayor a 0.');
    if (!form.direccion.trim()) erroresTemporales.push('La dirección es obligatoria.');
    if (!form.entrega.trim()) erroresTemporales.push('Debe seleccionar un tipo de entrega.');

    if (erroresTemporales.length > 0) {
      setErrores(erroresTemporales);
      return;
    }

    localStorage.setItem('presupuestoMaximo', form.presupuesto);

    setErrores([]);
    console.log('Formulario enviado:', form);
    navigate('/taller');
  };

  const handleClear = () => {
    setForm({
      nombre: '',
      presupuesto: '',
      direccion: '',
      entrega: '',
    });
    setErrores([]);
  };

  return (
    <div className="fondo-formulario">
      <div className="contenedor-formulario">
        <h2>Requerimientos de Compra</h2>

        {errores.length > 0 && (
          <div className="errores" style={{ backgroundColor: '#ffe5e5', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <ul>
              {errores.map((error, index) => (
                <li key={index} style={{ color: 'red' }}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Presupuesto máximo:</label>
            <input
              type="number"
              name="presupuesto"
              value={form.presupuesto}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div>
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Tipo de entrega:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="retiro"
                  checked={form.entrega === 'retiro'}
                  onChange={handleChange}
                />
                Retiro en taller
              </label>
              <label>
                <input
                  type="radio"
                  name="entrega"
                  value="envio"
                  checked={form.entrega === 'envio'}
                  onChange={handleChange}
                />
                Envío a domicilio
              </label>
            </div>
          </div>

          <div className="botones">
            <button type="submit">
              Iniciar compra
            </button>
            <button type="button" onClick={handleClear}>
              Limpiar campos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseRequirements;
