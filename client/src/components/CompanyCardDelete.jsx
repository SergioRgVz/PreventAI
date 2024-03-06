import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { useState } from 'react';
import  axios from 'axios';
import AlertDialog from './AlertDialog';

export const CompanyCardDelete = ({ company, onRemoveCompany }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = async (CIF) => {
        try{
            console.log("CIF: ", CIF);
            const response = await axios.delete(`/company/delete/${CIF}`);
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
            <AlertDialog handleDelete={() => handleDelete(company.CIF)} color="error" aria_label="eliminar compañía"/>
        </CardActions>
        </Card>
    );
};
