import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import AlertDialog from './AlertDialog';
import { companyService } from '../hooks/useCompanies';

export const CompanyCard = ({ company, onRemoveCompany }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleView = () => {
    setOpenDialog(true);
  };

  const handleEdit = () => {
    setOpenDialog(true);
  };

  const handleDelete = async (CIF) => {
    try {
      console.log("CIF: ", CIF);
      const response = await companyService.deleteCompany(CIF);
      console.log('Respuesta del servidor: ', response.data);
      onRemoveCompany(CIF);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error al eliminar la compañía: ', error);
    }
    console.log('Compañía eliminada: ', CIF);


    setOpenDialog(true);
  };

  return (
    <Card sx={{ m: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Typography gutterBottom variant="h5" component="div">
          {company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CIF: {company.CIF}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comunidad Autónoma: {company.ccaa}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Provincia: {company.provincia}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Municipio: {company.municipio}
        </Typography>
      </CardContent>
      <CardActions sx={{
        flexDirection: 'column'
      }}>
        <IconButton onClick={handleView} color="primary" aria-label="ver detalle">
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={handleEdit} color="primary" aria-label="editar compañía">
          <EditIcon />
        </IconButton>
        <AlertDialog handleDelete={() => handleDelete(company.CIF)} color="error" aria_label="eliminar compañía" />
      </CardActions>
    </Card>
  );
};
