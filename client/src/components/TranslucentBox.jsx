import Image from '/logo_bg2.jpg'
import { Box } from '@mui/material';

export function TranslucentBox({ children, maxWidth }) {
  return (
    <Box sx={{
      backgroundImage: `url(${Image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'auto'
    }}>

      <Box sx={{
        width: 'auto',
        maxWidth: maxWidth || 'auto',
        padding: theme => theme.spacing(2),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '15px',
        p: 4, 
        boxShadow: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
          margin: '8px 0'
        }
      }}>
        {children}
      </Box>
    </Box>
  );
}
