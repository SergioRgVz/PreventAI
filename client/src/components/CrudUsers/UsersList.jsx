import { DataCard } from '../utils/DataCard'; 
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { userService } from '../../hooks/useUsers';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRemoveUser = (DNI) => {
    setUsers(users.filter(user => user.DNI !== DNI));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userService.getUsers();
        const transformedUsers = data.map(user => ({
          ...user,
          esTecnico: user.esTecnico ? 'Sí' : 'No',
        }));
        setUsers(transformedUsers);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const userConfig = {
    identifierKey: 'DNI',
    fields: [
      { name: 'Nombre', label: 'Nombre' },
      { name: 'Apellidos', label: 'Apellidos' },
      { name: 'DNI', label: 'DNI' },
      { name: 'Correo', label: 'Correo' },
      { name: 'Telefono', label: 'Teléfono' },
      { name: 'esTecnico', label: 'Técnico' },
    ],
    onView: (user) => {
      console.log("Viendo usuario", user);
    },
    onEdit: (user) => {
      console.log("Editando usuario", user);
    },
    deleteService: async (DNI) => {
      await userService.deleteUser(DNI);
    },
    viewEnabled: false,
    editEnabled: false,
    deleteEnabled: true,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (Array.isArray(users) && users.length === 0) {
    return <div>No se encuentran usuarios.</div>;
  }

  if (Array.isArray(users) && users.length !== 0) {
    return (
      <Stack spacing={2}>
        {users.map((user) => (
          <DataCard
            item={user}
            key={user.DNI}
            config={userConfig}
            onRemove={() => handleRemoveUser(user.DNI)}
          />
        ))}
      </Stack>
    );
  } else {
    return <div>Error: La respuesta no es un array.</div>;
  }
};
