import AppBarHome from '../components/AppBarHome';
import { TranslucentBox } from '../components/TranslucentBox';
import { GoBackButton } from '../components/GoBackButton';
import { AddEmployee } from '../components/AddEmployee';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function CreateEmployee() {

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'}>
        <AddEmployee />
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}