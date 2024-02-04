import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { HeaderLandingPage } from '../components/HeaderLandingPage';

export function LandingPage(props) {
  const { loggedIn, email, setLoggedIn } = props
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/start'); 
  };

  return (
    <Box sx={{ backgroundColor: 'rgb(231, 239, 246)', height: '100vh'}}>
      <HeaderLandingPage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '6fr 3fr', alignItems: 'center', gap: 4 }}>
          <Box component="img" src="/empleados_landing.png" alt="Empleados" sx={{ width: '100%', height: 'auto' }} />
          <Box>
            <Typography variant="h3" gutterBottom>
              Seguridad en tus manos, informes sin riesgos. 
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Tu camino hacia un entorno laboral más seguro comienza aquí.
            </Typography>
            <Button variant="contained" onClick={handleStart} size="large" sx={{ bgcolor: 'gold' }}>
              Empieza ahora
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

