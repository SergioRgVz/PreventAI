import React from 'react';
import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { CompaniesList } from '../components/CompaniesList';
import Divider from '@mui/material/Divider';
import { GoBackButton } from '../components/GoBackButton';

const pageToRouteMapping = {
    'Inicio': '/home',
    'Nueva evaluación': '/new-report',
    'Abrir evaluación': '/open-report',
    'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function CompaniesPage(props) {
const [value, setValue] = React.useState(0);

const handleChange = ( _, newValue) => {
setValue(newValue);
};

return (
    <>
        <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
        <TranslucentBox maxWidth={'600px'}>
            <Divider />
            <CompaniesList/>
            <GoBackButton/>
        </TranslucentBox>
    </>
);
}