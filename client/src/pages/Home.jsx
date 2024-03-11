import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import AppBarHome from '../components/AppBarHome';
import { ButtonForm } from '../components/ButtonForm';
import { TranslucentBox } from '../components/TranslucentBox';
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
      <TranslucentBox maxWidth={'300px'}>
        <ButtonForm url='/new-report'>Nueva evaluación</ButtonForm>
        <ButtonForm url='/open-report'>Abrir evaluación</ButtonForm>
        <ButtonForm url='/management'>Empresas/Empleados</ButtonForm>
      </TranslucentBox>
    </>
  );
}