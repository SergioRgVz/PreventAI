import { useState } from 'react';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';
import { UsersListButton } from '../components/CrudUsers/UsersListButton'; 
import { FormularioUser } from '../components/CrudUsers/FormularioUser'; 
import { userService } from '../hooks/useUsers';
import Typography from '@mui/material/Typography';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = [ 'Cerrar sesión'];

export function ModifyUser() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleFormSubmit = async (DNI, formData) => {
    await userService.updateUser(formData.ID, formData);
    setSelectedUser(null);
  };

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'800px'} sx={{ overflow: 'auto' }}>
        <Typography variant="h4" component="h4" gutterBottom>
          Tus usuarios
        </Typography>
        <UsersListButton onUserSelect={handleUserSelect} />
        {selectedUser && <FormularioUser user={selectedUser} onSubmit={handleFormSubmit} isEdit={true} />}
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}
