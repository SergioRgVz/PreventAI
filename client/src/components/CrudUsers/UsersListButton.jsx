import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataListButton } from '../utils/DataListButton';
import { userService } from '../../hooks/useUsers';

export const UsersListButton = ({ onUserSelect, children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userService.getUsers();
        const processedUsers = data.map(user => ({
          ...user,
          fullName: `${user.Nombre} ${user.Apellidos}`,
        }));
        setUsers(processedUsers);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userConfig = {
    identifierKey: 'DNI',
    fields: [
      { name: 'Nombre', label: 'Nombre completo', gutterBottom: true, variant: 'h6' },
      { name: 'DNI', label: 'DNI', gutterBottom: false, variant: 'body' },
      { name: 'Correo', label: 'Correo', gutterBottom: false, variant: 'body' },
      { name: 'Telefono', label: 'Teléfono', gutterBottom: false, variant: 'body' },
      { name: 'esTecnico', label: 'Técnico', gutterBottom: false, variant: 'body', transform: (value) => (value ? 'Sí' : 'No') },
    ],
  };

  return (
    <Stack spacing={2}>
      <DataListButton
        onItemSelect={onUserSelect}
        items={users}
        service={{ getItems: userService.getUsers }} // Asegúrate de pasar el servicio aquí
        config={userConfig}
      >
        {children}
      </DataListButton>
    </Stack>
  );
};
