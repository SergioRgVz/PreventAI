import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backendName, setBackendName] = useState('Cargando...');

  useEffect(() => {
    // Realizar la llamada API al cargar el componente
    fetch('/api/get-name')
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => setBackendName(data.name)) // Actualizar el estado con el nombre
      .catch(error => console.error('Error al cargar el nombre:', error)); // Manejar cualquier error
  }, []);

  console.log('Backend name: ', backendName); // eslint-disable-line no-console
  return (
    <body>
      <h1>Hello World  {backendName}</h1>
    </body>
  )
}

export default App
