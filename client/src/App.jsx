import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import axios from 'axios';
import './App.css'

// const apiCall = () => {
//   axios.get('http://localhost:8080/test').then((data) => {
//     console.log(data)
//   })
// }

// function App() {
//   const [backendName, setBackendName] = useState('Cargando...');

//   useEffect(() => {
//     fetch('/api/get-name')
//       .then(response => response.json())
//       .then(data => setBackendName(data.name))
//       .catch(error => console.error('Error al cargar el nombre:', error)); 
//   }, []);

//   console.log('Backend name: ', backendName);
//   return (
//     <body>
//       <h1>Hello World  {backendName}</h1>
//       <button onClick={apiCall}>Make API Call</button>
//     </body>
//   )
// }

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </Router>  
  )
}
export default App
