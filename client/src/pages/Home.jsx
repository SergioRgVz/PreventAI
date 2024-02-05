import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import AppBarHome from '../components/AppBarHome';
import {Logo} from '../components/Logo';
import Image from '/logo_bg2.jpg'


const pages = ['Inicio', 'Nueva evaluación', 'Abrir evaluación', 'Gestionar'];
const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function HomePage(props) {
	const navigate = useNavigate();
	const handleClick = (url) => {
		navigate(url);
	}
  return (
		<>
			<AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
			<Box sx={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover',
								backgroundPosition: 'center', height: '100vh',
								display: 'flex', flexDirection: 'column',
								alignItems: 'center', justifyContent: 'center'}}>
				<Box sx={{width:'100%', maxWidth: '400px', 
									backgroundColor: 'rgba(255, 255, 255, 0.9)', 
									borderRadius: '15px', p: 2, 
									boxShadow: 3, display: 'flex', 
									flexDirection: 'column', alignItems:'center',
									justifyContent: 'center'}}>
						<Button variant='contained' color='secondary' onClick={() => handleClick('/new-report')} sx={{mt:2}}>
              Nueva evaluación
            </Button>
						<Button variant='contained' color='secondary' onClick={() => handleClick('/new-report')} sx={{mt:4}}>
              Abrir evaluación
            </Button>
						<Button variant='contained' color='secondary' onClick={() => handleClick('/management')} sx={{mt:4, mb: 2}}>
              Empresas
            </Button>
				</Box>
			</Box>
		</>
  );
}