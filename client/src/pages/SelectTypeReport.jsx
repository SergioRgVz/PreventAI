import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { Button } from '@mui/material';
import { GoBackButton } from '../components/utils/GoBackButton';
import GINSHT from '../components/CrudReports/GINSHT/GINSHT';
import PWD from '../components/CrudReports/PWD';
import REBA from '../components/CrudReports/REBA';

const pageToRouteMapping = {
    'Inicio': '/home',
    'Nueva evaluación': '/create-report',
    'Abrir evaluación': '/view-reports',
    'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function SelectTypeReport() {
    const navigate = useNavigate();
    const handleClick= (url) => {
        console.log("url: ", url);
        navigate(url);
    }
    return (
        <>
            <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
            <TranslucentBox maxWidth={"2500px"}>
                <Stack direction="row" spacing={3}
                >
                    <Box sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                        }
                    }}>
                        <Button variant="contained" onClick={() => handleClick('/create-GINSHT')}>
                            <GINSHT sx={{ maxWidth: 250, maxHeight: 250, width: 'auto', height: 'auto' }} />
                        </Button>
                        <Box textAlign={"center"} mt={3}>GINSHT</Box>
                    </Box>
                    <Box sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}>
                        <Button variant="contained" onClick={() => handleClick('/create-PVD')}>
                            <PWD sx={{ maxWidth: 250, maxHeight: 250, width: 'auto', height: 'auto' }} />
                        </Button>
                        <Box textAlign={"center"} mt={3}>PWD</Box>
                    </Box>
                    <Box sx={{
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}>
                        <Button variant="contained" onClick={() => handleClick('/create-REBA')}>
                            <REBA sx={{ maxWidth: 250, maxHeight: 250, width: 'auto', height: 'auto' }} />
                        </Button>
                        <Box textAlign={"center"} mt={3}>REBA</Box>
                    </Box>
                </Stack>
                <GoBackButton />
            </TranslucentBox>
        </>
    );
}
