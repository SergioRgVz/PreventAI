import AppBarHome from '../components/utils/AppBarHome';
import Typography from '@mui/material/Typography';
import { TranslucentBox } from '../components/utils/TranslucentBox';
// import { EmployeesList } from '../components/CrudEmpleados/EmployeesList';
import { ReportList } from '../components/CrudReports/ReportsList';
import Divider from '@mui/material/Divider';
import { GoBackButton } from '../components/utils/GoBackButton';

const pageToRouteMapping = {
    'Inicio': '/home',
    'Nueva evaluación': '/create-report',
    'Abrir evaluación': '/view-reports',
    'Gestionar': '/management',
};
const settings = ['Perfil', 'Cerrar sesión'];

export function ReportsPage() {
    // const [value, setValue] = React.useState(0);

    // const handleChange = ( _, newValue) => {
    // setValue(newValue);
    // };

    return (
        <>
            <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
            <TranslucentBox maxWidth={'600px'}>
                <Divider />
                <Typography variant="h4" component="h4" gutterBottom sx={{ mt: 2, zIndex: 'tooltip' }}>
                    Informes
                </Typography>
                <ReportList />
                <GoBackButton />
            </TranslucentBox>
        </>
    );
}