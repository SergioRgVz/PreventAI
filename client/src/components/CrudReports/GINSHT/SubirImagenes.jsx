import { Button, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const SubirImagenes = ({ images, setImages, showText }) => {
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

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Subida de imágenes
      </Typography>
      {showText === "GINSHT" && <p>Suba imágenes del empleado a examinar para hacer una correcta detección automática sobre su postura, las imágenes deben ser de perfil y desde una altura correcta.</p>}
      {showText == "REBA" && <p>Suba imágenes del empleado a examinar para hacer una correcta detección automática sobre su postura. Las imágenes deben ser de perfil y desde una altura correcta.</p>}
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
    </>
  );
};

export default SubirImagenes;
