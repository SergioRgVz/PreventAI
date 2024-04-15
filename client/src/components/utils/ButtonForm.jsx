import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export function ButtonForm({ url, children }) {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const buttonStyle = {
    minWidth: '200px', minHeight: '50px',
    whiteSpace: 'nowrap', mt: 2,
    mb: 2, ml: 2, mr: 2,
  };

  return (
    <Button variant='contained' color='buttons' onClick={() => handleButtonClick(url)} sx={buttonStyle}>
      {children}
    </Button>
  )
}