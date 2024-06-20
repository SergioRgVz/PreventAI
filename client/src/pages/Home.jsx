import AppBarHome from '../components/utils/AppBarHome';
import { ButtonForm } from '../components/utils/ButtonForm';
import { TranslucentBox } from '../components/utils/TranslucentBox';


const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function HomePage() {
  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'300px'}>
        <ButtonForm url='/create-report'>Nueva evaluación</ButtonForm>
        <ButtonForm url='/view-reports'>Abrir evaluación</ButtonForm>
        <ButtonForm url='/management'>Gestionar</ButtonForm>
      </TranslucentBox>
    </>
  );
}