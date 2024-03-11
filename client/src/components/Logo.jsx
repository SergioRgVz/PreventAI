import { IconButton } from '@mui/material'; // Import the IconButton component from the '@mui/material' package
import { useNavigate } from 'react-router-dom';

export function Logo() {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/'); // Navigate to the home page
    }
    return (
        <IconButton edge={'start'} size={'small'} color={'inherit'} onClick={handleNavigateHome} >
            <img src="\LOGOTFG.png" alt="PreventAI" style={{ height: '60px' }} />
        </IconButton>
    );
}