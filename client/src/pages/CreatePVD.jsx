
import AppBarHome from '../components/utils/AppBarHome';
import { PVDFormulary } from '../components/CrudReports/PVD/PVDFormulary';
const pageToRouteMapping = {
    'Inicio': '/home',
    'Nueva evaluación': '/create-report',
    'Abrir evaluación': '/open-report',
    'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function CreatePVD() {

    return (
        <>
            <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
            <PVDFormulary />
        </>
    );
}

