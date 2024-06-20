// Componente ImageUploadStep ajustado para recibir la configuración completa de 'images'
import React from 'react';
import { useFormikContext } from 'formik';
import { Grid, Typography, Box, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageUploadField from './ImageUploadField.jsx';  // Asegúrate de importar tu componente personalizado

export default function ImageUploadStep({ formField }) {
    const { values, setFieldValue } = useFormikContext();

    // Asegúrate de que 'formField.images' exista y sea un objeto correcto
    const imagesField = formField.images;

    return (
        <React.Fragment>
            
            <Typography variant="h4" gutterBottom>
                {imagesField.label}
            </Typography>
            <Typography variant="h6" gutterBottom>
                        Por favor, suba las imágenes necesarias para la evaluación.
                    </Typography>
            <Grid container spacing={3} paddingBottom={'20px'}>
                <Grid item xs={12}>
                    <ImageUploadField name={imagesField.name} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
