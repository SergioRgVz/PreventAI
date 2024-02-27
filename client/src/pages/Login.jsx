import { Box, Typography, FormControl, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Logo } from '../components/Logo';
import { TranslucentBox } from '../components/TranslucentBox';
import { loginUser as loginUserService } from '../services/authService';

export function LoginPage({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Introduce el correo electrónico, por favor";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = "Ingrese un correo electrónico válido";
    if (!password) newErrors.password = "Introduce la contraseña, por favor";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onButtonClick = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await loginUserService(email, password);
        console.log('Login exitoso:');
        setLoggedIn(true); 
        navigate('/home'); 
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              setErrors({ ...errors, password: "Contraseña incorrecta" });
              break;
            case 404:
              setErrors({ ...errors, email: "Usuario no encontrado" });
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
  };

  return (
      <TranslucentBox maxWidth={'700px'}>    
        <Logo />
        <Typography variant="h3" component="h1" gutterBottom sx={{mt: 2}}>
          Iniciar sesión
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Bienvenido a la web de PreventAI
        </Typography>
        <FormControl defaultValue="" required>
          <TextField 
            error={Boolean(errors.email)}
            helperText={errors.email}
            id="email"
            label="Correo electrónico"
            variant="filled"
            onChange={e => setEmail(e.target.value)}
            value={email}
            sx={{width:'500px', mb: 2}}
          />
          <TextField
            error={Boolean(errors.password)}
            helperText={errors.password}
            id="password"
            label="Contraseña"
            variant="filled"
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            sx={{width:'500px', mb: 2}}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Recuérdame"
            sx={{mb: 2}}
          />
          <Button color='info' variant="contained" type="submit" value={"Log in"} onClick={onButtonClick} sx={{mb: 2, width:'fit-content', ml: 'auto'}}>
            Iniciar sesión
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
          <Typography variant="body2">
            ¿No tienes cuenta aún?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: 'info.main' }}>
              Regístrate
            </Link>
          </Typography>
          <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'info.main', mt: 2 }}>
            ¿Has olvidado la contraseña?
          </Link>
          </Box>
        </FormControl>
        
    </TranslucentBox>
  );
}
