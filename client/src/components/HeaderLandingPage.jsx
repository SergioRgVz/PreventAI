import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Logo } from '../components/Logo';


export function HeaderLandingPage(props) {
    const navigate = useNavigate();
  
    const handleRegister = () => {
      navigate('/register');
    };
    
  
    const handleLogin = () => {
      navigate('/login');
    };
  
    return (
      <AppBar elevation={0} position='relative' sx={{ backgroundColor: 'rgb(231, 239, 246)' }}>
        <Toolbar sx={{ justifyContent: 'space-between'}} >
          <Logo />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant='outlined' color='info' onClick={handleLogin}>
              Iniciar Sesión
            </Button>
            <Button variant='outlined' color='info' onClick={handleRegister}>
              Registrarse
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
  