import { Box, Typography, FormControl, TextField, Button } from '@mui/material'
import { useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/utils/Logo'
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { registerUser as registerUserService } from '../services/authService';


export function RegisterPage({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();


  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio';
    if (!surname) newErrors.surname = 'El apellido es obligatorio';
    if (!email) newErrors.email = 'El correo electrónico es obligatorio';
    if (!telephone) newErrors.telephone = 'El teléfono es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const onButtonClick = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await registerUserService(email, password, name, surname, telephone);
        console.log('Registro exitoso:', response);
        setLoggedIn(true);
        navigate('/home');
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 409:
              setErrors({ ...errors, email: "Este usuario ya existe" });
              break;
            default:
              console.error('Error desconocido', error);
              break;
          }
        } else {
          console.error('Error en la petición', error);
        }
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <TranslucentBox maxWidth={'700px'}>
      <Logo />
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
        Registro
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Bienvenido a la web de PreventAI
      </Typography>
      <FormControl defaultValue="" required>
        <TextField
          error={!!errors.name}
          helperText={errors.name}
          id="name"
          variant="filled"
          label="Nombre"
          onChange={e => setName(e.target.value)}
          required
          value={name}
          onKeyPress={handleKeyPress}
          sx={{ width: '500px', mb: 2 }}
        />
        <TextField
          error={!!errors.surname}
          helperText={errors.surname}
          id="surname"
          variant="filled"
          label="Apellidos"
          onChange={e => setSurname(e.target.value)}
          required
          value={surname}
          onKeyPress={handleKeyPress}
          sx={{ width: '500px', mb: 2 }}
        />
        <TextField
          error={!!errors.email}
          helperText={errors.email}
          id="email"
          variant="filled"
          label="Correo electrónico"
          onChange={e => setEmail(e.target.value)}
          required
          type="email"
          value={email}
          onKeyPress={handleKeyPress}
          sx={{ width: '500px', mb: 2 }}
        />
        <TextField
          error={!!errors.telephone}
          helperText={errors.telephone}
          id="telephone"
          variant="filled"
          label="Teléfono"
          onChange={e => setTelephone(e.target.value)}
          required
          type="tel"
          value={telephone}
          onKeyPress={handleKeyPress}
          sx={{ width: '500px', mb: 2 }}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password}
          id="password"
          variant="filled"
          label="Contraseña"
          onChange={e => setPassword(e.target.value)}
          required
          type="password"
          value={password}
          onKeyPress={handleKeyPress}
          sx={{ width: '500px', mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <Button color='buttons' variant="contained" type="submit" onClick={onButtonClick} onKeyDown={onButtonClick}>
            Registrarse
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
          <Typography variant="body2">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: 'info.main' }}>
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </FormControl>
    </TranslucentBox>
  );
}
