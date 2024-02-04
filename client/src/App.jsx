import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
      light: '#DAECFF',
      //... otros tonos de azul si son necesarios
    },
    //... otros colores y configuraciones
  },
});
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
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/register" element={<RegisterPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </Router>  
    </ThemeProvider>
  )
}
export default App
