import AppBarHome from '../components/AppBarHome';
import { ButtonForm } from '../components/ButtonForm';
import { TranslucentBox } from '../components/TranslucentBox';


const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/new-report',
  'Abrir evaluación': '/open-report',
  'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function HomePage() {
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