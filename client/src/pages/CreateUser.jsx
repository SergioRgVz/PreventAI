import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';
import { AddUser } from '../components/CrudUsers/AddUser';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = ['Cerrar sesión'];

export function CreateUser() {

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'}>
        <AddUser />
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}