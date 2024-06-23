import React, { useState, useEffect } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const SubirImagenes = ({
  images,
  setImages,
  showText,
  handleChange,
  GINSHT,
  REBA,
}) => {
  const [showDetectionButton, setShowDetectionButton] = useState(false);

  useEffect(() => {
    setShowDetectionButton(images.length > 0);
  }, [images]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDetection = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image.file);
    });

    if (GINSHT) {
      try {
        let altura = false;
        let separacion = false;
        const response = await axios.post(
          "http://localhost:8000/procesar_imagen/?tipo=GINSHT",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        altura = response.data.posiciones.altura;
        separacion = response.data.posiciones.separacion;

        if (altura !== false)
          handleChange({ target: { name: "deteccionAltura", value: altura } });
        handleChange({
          target: { name: "alturaLevantamiento", value: altura },
        });
        if (separacion !== false)
          handleChange({
            target: { name: "deteccionSeparacion", value: separacion },
          });
        handleChange({
          target: { name: "deteccionSeparacion", value: separacion },
        });

        if (response.data.image)
          handleChange({
            target: { name: "imagenDeteccion", value: response.data.image },
          });

        console.log(
          "Detección automática realizada:",
          response.data.posiciones
        );
      } catch (error) {
        console.error("Error al realizar la detección automática:", error);
      }
    }
    if(REBA){
      try {
        let postura = false;
        const response = await axios.post(
          "http://localhost:8000/procesar_imagen/?tipo=REBA",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        postura = response.data.posiciones;
        let pcuello = postura.cuello;
        let ptronco = postura.tronco;
        let pbrazos = postura.brazos;
        let ppiernas = postura.piernas;
        let pantebrazos = postura.antebrazos;
        let pmuñecas = postura.muñecas;
        console.log("Detección automática realizada:", response.data.posiciones);
        
        if (pcuello !== false && pcuello !== null) {
          handleChange({ target: { name: "PCuello", value: pcuello } });
          handleChange({ target: { name: "deteccionCuello", value: pcuello } });
        }
        if (ptronco !== false && ptronco !== null) {
          handleChange({ target: { name: "PTronco", value: ptronco } });
          handleChange({ target: { name: "deteccionTronco", value: ptronco } });
        }
        if (pbrazos !== false && pbrazos !== null) {
          handleChange({ target: { name: "PBrazos", value: pbrazos } });
          handleChange({ target: { name: "deteccionBrazos", value: pbrazos } });
        }
        if (ppiernas !== false && ppiernas !== null) {
          handleChange({ target: { name: "PPiernas", value: ppiernas } });
          handleChange({ target: { name: "deteccionPiernas", value: ppiernas } });
        }
        if (pantebrazos !== false && pantebrazos !== null) {
          handleChange({ target: { name: "PAntebrazos", value: pantebrazos } });
          handleChange({ target: { name: "deteccionAntebrazos", value: pantebrazos } });
        }
        if (pmuñecas !== false && pmuñecas !== null) {
          handleChange({ target: { name: "PMunnecas", value: pmuñecas } });
          handleChange({ target: { name: "deteccionMunnecas", value: pmuñecas } });
        }

      } catch (error) {
        console.error("Error al realizar la detección automática:", error);
      }
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Subida de imágenes
      </Typography>
      {showText === "GINSHT" && (
        <p>
          Suba imágenes del empleado a examinar para hacer una correcta
          detección automática sobre su postura, las imágenes deben ser de
          perfil y desde una altura correcta.
        </p>
      )}
      {showText === "REBA" && (
        <p>
          Suba imágenes del empleado a examinar para hacer una correcta
          detección automática sobre su postura. Las imágenes deben ser de
          perfil y desde una altura correcta.
        </p>
      )}
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-button"
        multiple
        type="file"
        onChange={handleImageUpload}
      />
      <label
        htmlFor="upload-button"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button variant="contained" color="primary" component="span">
          Subir Imágenes
        </Button>
      </label>
      <Grid container spacing={2} marginTop={2}>
        {images.map((image, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <div style={{ position: "relative" }}>
              <img
                src={image.preview}
                alt={`preview-${index}`}
                style={{ width: "100%", height: "auto" }}
              />
              <IconButton
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </Grid>
        ))}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDetection}
          disabled={!showDetectionButton} // Botón deshabilitado si no hay imágenes
        >
          Realizar detecciones automáticas
        </Button>
      </div>
    </>
  );
};

export default SubirImagenes;
