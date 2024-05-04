
import AppBarHome from '../components/utils/AppBarHome';
import { GINSHTFormulary } from '../components/CrudReports/GINSHT/GINSHTFormulary';
const pageToRouteMapping = {
    'Inicio': '/home',
    'Nueva evaluación': '/create-report',
    'Abrir evaluación': '/view-reports',
    'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function CreateGINSHT() {

    return (
        <>
            <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
            <GINSHTFormulary />
        </>
    );
}

