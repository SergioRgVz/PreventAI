import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { HomePage } from './pages/Home';
import { SelectTypeReport } from './pages/SelectTypeReport';
import { ManagementPage } from './pages/Management';
import { CompaniesPage } from './pages/CompaniesPage';
import { EditCompany } from './pages/EditCompany';
import { CreateCompany } from './pages/CreateCompany';
import { ModifyCompany } from './pages/ModifyCompany';
import { DeleteCompany } from './pages/DeleteCompany';
import { UsersPage } from './pages/UsersPage';
import { CreateUser } from './pages/CreateUser';
import { ModifyUser } from './pages/ModifyUser';
import { DeleteUser } from './pages/DeleteUser';
import { EmployeesPage } from './pages/EmployeesPage';
import { CreateEmployee } from './pages/CreateEmployee';
import { ModifyEmployee } from './pages/ModifyEmployee';
import { DeleteEmployee } from './pages/DeleteEmployee';
import { ViewReport } from './pages/ViewReport.jsx';
import { ModifyReport } from './pages/ModifyReport.jsx';
import { EditReport } from './pages/EditReport.jsx';
import { CreateGINSHT } from './pages/CreateGINSHT';
import { CreatePVD } from './pages/CreatePVD';
import { CreateREBA } from './pages/CreateREBA';
import { ReportsPage } from './pages/ReportsPage';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es';

import './App.css'
const theme = createTheme({
  palette: {
    primary: {
      main: '#d2e3ea',
    },
    secondary: {
      main: '#115293',
    },
    buttons: {
      main: '#8fc5e9',
    },
    info: {
      main: '#f3f6cf'
    },
  },
});


export function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <ThemeProvider theme={theme}>
        <script src="http://localhost:8097"></script>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/register" element={<RegisterPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/home" element={<HomePage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/create-report" element={<SelectTypeReport/> }/>
            <Route path="/create-GINSHT" element={<CreateGINSHT/> }/>
            <Route path="/create-PVD" element={<CreatePVD/> }/>
            <Route path="/create-REBA" element={<CreateREBA/> }/>
            <Route path="/view-reports" element={<ReportsPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management" element={<ManagementPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/view-companies" element={<CompaniesPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/create-company" element={<CreateCompany setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/modify-company" element={<ModifyCompany setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/modify-company/:CIF" element={<EditCompany setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/delete-company" element={<DeleteCompany setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/view-employees" element={<EmployeesPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/create-employee" element={<CreateEmployee setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/modify-employee" element={<ModifyEmployee setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/delete-employee" element={<DeleteEmployee setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/view-reports" element={<ReportsPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/view-report/:Referencia" element={<ViewReport setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/modify-report" element={<ModifyReport setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/modify-report/:Referencia" element={<EditReport setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          {/* <Route path="/management/modify-report/:Referencia" element={<EditReport setLoggedIn={setLoggedIn} setEmail={setEmail} />} /> 
            <Route path="/management/delete-report" element={<DeleteReport setLoggedIn={setLoggedIn} setEmail={setEmail} />} /> */}
            <Route path="/management/view-user" element={<UsersPage setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/create-user" element={<CreateUser setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/modify-user" element={<ModifyUser setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="/management/delete-user" element={<DeleteUser setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>

  )
}
export default App
