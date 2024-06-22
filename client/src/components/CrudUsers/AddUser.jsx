
import { FormularioUser } from "../CrudUsers/FormularioUser"; // Asegúrate de crear y configurar este componente
import { userService } from "../../hooks/useUsers";
import Typography from "@mui/material/Typography";



export function AddUser() {
  const handleFormSubmit = async (formData) => {
    await userService.createUser(formData);
  };

  const user = {
    DNI: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    telephone: "",
    role: "",
  };

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 2 }}>
        Añadir Usuario
      </Typography>
      <FormularioUser user={user} onSubmit={handleFormSubmit} />
    </>
  );
}
