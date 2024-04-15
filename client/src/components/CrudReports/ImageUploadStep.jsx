import { useState } from 'react';
import React  from 'react';
import { Typography, Grid, Box, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function ImageUploadStep() {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Imágenes
      </Typography>
      <Typography variant="subtitle1">
        Adjunta aquí tus imágenes, máximo 4.
      </Typography>

      <Box sx={{ mt: 2, mb: 2 }}>
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
      </Box>

      <Grid container spacing={2} paddingBottom={'20px'}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              sx={{
                width: '100%',
                height: 140,
                backgroundColor: images[index] ? 'transparent' : '#eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px dashed grey',
              }}
            >
              {images[index] ? (
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`upload-preview-${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <PhotoCamera sx={{ color: 'grey.500' }} />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

export default ImageUploadStep;
