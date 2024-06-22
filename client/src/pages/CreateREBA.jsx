
import AppBarHome from '../components/utils/AppBarHome';
import { REBAFormulary } from '../components/CrudReports/REBA/REBAFormulary';
const pageToRouteMapping = {
    'Inicio': '/home',
    'Nueva evaluación': '/create-report',
    'Abrir evaluación': '/view-reports',
    'Gestionar': '/management',
};
const settings = [ 'Cerrar sesión'];

export function CreateREBA() {

    return (
        <>
            <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
            <REBAFormulary />
        </>
    );
}

