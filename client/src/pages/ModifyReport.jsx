// ModifyReport.js
import { useState } from 'react';
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';
import { ReportsListButton } from '../components/CrudReports/ReportsListButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = [ 'Cerrar sesión'];

export function ModifyReport() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportSelect = (report) => {
    if (report.Referencia) {
        setSelectedReport(report);
      console.log("Report selected: ", selectedReport);
      navigate(`/management/modify-report/${report.Referencia}`);
    }
  }

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'600px'} sx={{ overflow: 'auto' }}>
        <Typography variant="h4" component="h4" gutterBottom>
          Tus informes
        </Typography>
        <ReportsListButton handleReportSelect={handleReportSelect} />
        <GoBackButton />
      </TranslucentBox>
    </>
  );
}
