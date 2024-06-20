import AppBarHome from "../utils/AppBarHome";
import { TranslucentBox } from "../utils/TranslucentBox";
import { GoBackButton } from "../utils/GoBackButton";
import { FormularioUser } from "../CrudUsers/FormularioUser"; // Asegúrate de crear y configurar este componente
import { userService } from "../../hooks/useUsers";
import Typography from "@mui/material/Typography";

const pageToRouteMapping = {
  Inicio: "/home",
  "Nueva evaluación": "/create-report",
  "Abrir evaluación": "/view-reports",
  Gestionar: "/management",
};

const settings = ["Perfil", "Cerrar sesión"];

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
