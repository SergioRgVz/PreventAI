import {
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";

export const FormularioUser = ({ onSubmit, user, isEdit = false }) => {
  const [formData, setFormData] = useState({
    DNI: user.DNI || "",
    email: user.Correo || "",
    password: "",
    name: user.Nombre || "",
    surname: user.Apellidos || "",
    telephone: user.Telefono || "",
    role: user.esTecnico ? "tecnico" : "administrador",
  });

  useEffect(() => {
    setFormData({
      DNI: user.DNI || "",
      email: user.Correo || "",
      password: "",
      name: user.Nombre || "",
      surname: user.Apellidos || "",
      telephone: user.Telefono || "",
      role: user.esTecnico ? "tecnico" : "administrador",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ overflow: "auto" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="DNI"
        label="DNI"
        name="DNI"
        autoComplete="DNI"
        onChange={handleChange}
        value={formData.DNI}
        autoFocus
        variant="filled"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        onChange={handleChange}
        value={formData.email}
        variant="filled"
      />
      {!isEdit && (
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="password"
          onChange={handleChange}
          value={formData.password}
          variant="filled"
        />
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Nombre"
        name="name"
        autoComplete="name"
        onChange={handleChange}
        value={formData.name}
        variant="filled"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="surname"
        label="Apellidos"
        name="surname"
        autoComplete="surname"
        onChange={handleChange}
        value={formData.surname}
        variant="filled"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="telephone"
        label="Teléfono"
        name="telephone"
        autoComplete="telephone"
        onChange={handleChange}
        value={formData.telephone}
        variant="filled"
      />
      {!isEdit && (
        <FormControl fullWidth variant="filled" margin="normal">
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="tecnico">Técnico</MenuItem>
            <MenuItem value="administrador">Administrador</MenuItem>
          </Select>
        </FormControl>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Enviar
      </Button>
    </Box>
  );
};
