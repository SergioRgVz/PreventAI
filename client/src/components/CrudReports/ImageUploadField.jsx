import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Box, IconButton, Grid } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';

export default function ImageUploadField(props) {
    const [field, meta, helpers] = useField(props);
    const { setFieldValue, values } = useFormikContext();

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files) {
            // Crea un arreglo con los archivos nuevos más los ya existentes
            const newFileArray = Array.from(files);
            // Concatena los nuevos archivos con los existentes
            const allFiles = values[props.name] ? [...values[props.name], ...newFileArray] : [...newFileArray];
            setFieldValue(props.name, allFiles);
        }
    };

    return (
        <Box>
            <label htmlFor="icon-button-file">
                <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleImageChange}
                />
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            {meta.touched && meta.error && (
                <TextField
                    error
                    helperText={meta.error}
                    style={{ display: 'none' }}
                />
            )}
            <Grid container spacing={2}>
                {meta.value && meta.value.map((file, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Box sx={{
                            width: 200, // Anchura fija para el contenedor de la imagen
                            height: 200, // Altura fija para el contenedor de la imagen
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden', // Oculta cualquier parte de la imagen que exceda del contenedor
                            border: '1px solid rgba(0,0,0,0.1)'
                        }}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Imagen subida ${index + 1}`}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain' // Asegura que la imagen se ajuste sin distorsión
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
