import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';
import { AddCompany } from '../components/CrudEmpresas/AddCompany';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function CreateCompany() {

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox minWidth={'900px'} maxWidth={'900px'}>
        <AddCompany />
        <GoBackButton />
      </TranslucentBox>

      <div></div>
    </>
  );
}