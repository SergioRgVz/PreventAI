import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Logo } from './Logo';


export function HeaderLandingPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };


  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar elevation={0} position='relative' sx={{ backgroundColor: 'rgb(231, 239, 246)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }} >
        <Logo />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant='outlined' color='secondary' onClick={handleLogin}>
            Iniciar Sesión
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleRegister}>
            Registrarse
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
