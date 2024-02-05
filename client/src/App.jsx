import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { HomePage } from './pages/Home';
import { ManagementPage } from './pages/Management';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#d2e3ea',
      light: '#DAECFF',
    },
    secondary: {
      main: '#F6EFE7'
    },
    info: {
      main: '#42a5f5'
    },
  },
});

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
          <Route path="/home" element={<HomePage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/management" element={<ManagementPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </Router>  
    </ThemeProvider>
  )
}
export default App
