import { Card, CardContent, CardActions, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from './AlertDialog'; // Asegúrate de que la ruta sea correcta


export const CompanyCard = ({ company }) => {
    const [openDialog, setOpenDialog] = useState(false);
  // Añade aquí los manejadores de eventos para los botones
    const handleView = () => {
        setOpenDialog(true);
    };

    const handleEdit = () => {
        setOpenDialog(true);
    };

    const handleDelete = () => {
        console.log('Compañía eliminada');

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

            <AlertDialog handleDelete={handleDelete} color="error" aria_label="eliminar compañía"/>
        </CardActions>
        </Card>
    );
};
