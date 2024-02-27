import Image from '/logo_bg2.jpg'
import { Box } from '@mui/material';

export function TranslucentBox({ children, maxWidth }) {
  return (
    <Box sx={{
      backgroundImage: `url(${Image})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center', 
      height: '100vh', // Esto mantiene el fondo extendiéndose verticalmente
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center'
    }}>
      
      <Box sx={{
        width: 'auto', // Ancho automático para ajustarse al contenido
        maxWidth: maxWidth || 'auto', // Un maxWidth menor para que no se haga demasiado ancho
        padding: theme => theme.spacing(2),
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: '15px', 
        p: 3, // Incrementa el padding para más espacio interno
        boxShadow: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
          margin: '8px 0' // Espacio adicional entre elementos hijos si es necesario
        }
      }}>
        {children}
      </Box>
    </Box>
  );
}
