import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { useState } from 'react';
import AlertDialog from './AlertDialog';

export const EntityCardDelete = ({
  entity,
  onRemoveEntity,
  deleteService,
  entityIdentifier,
  entityDisplayFields,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  console.log("entity:", entity);
  const handleDelete = async () => {
    try {
      await deleteService(entity[entityIdentifier]);
      onRemoveEntity(entity[entityIdentifier]);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error al eliminar la entidad: ', error);
    }
    setOpenDialog(true);
  };

  return (
    <Card sx={{ m: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
      <CardContent sx={{ flex: '1 1 auto' }}>
        {entityDisplayFields.map((field) => (
          <Typography key={field.label} variant="body2" color="text.secondary">
            {field.label}: {entity[field.key]}
          </Typography>
        ))}
      </CardContent>
      <CardActions sx={{ flexDirection: 'column' }}>
        <AlertDialog handleDelete={handleDelete} color="error" aria_label={`eliminar ${entity[entityIdentifier]}`} />
      </CardActions>
    </Card>
  );
};
