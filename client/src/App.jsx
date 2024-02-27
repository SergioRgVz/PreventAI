import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { HomePage } from './pages/Home';
import { ManagementPage } from './pages/Management';
import { CompaniesPage } from './pages/CompaniesView';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { verifyToken } from './services/authService';
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

import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('token');
    const authed = verifyToken(token);
    return authed ? children : <Navigate to="/login" replace />;
};

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
          <Route path="/home" element={<RequireAuth><HomePage setLoggedIn={setLoggedIn} setEmail={setEmail} /></RequireAuth>} />
          <Route path="/management/view-companies" element={<CompaniesPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/management" element={<RequireAuth><ManagementPage setLoggedIn={setLoggedIn} setEmail={setEmail} /></RequireAuth>} />
          {/* <Route path="/management" element={<ManagementPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} /> */}
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </Router>  
    </ThemeProvider>
  )
}
export default App
