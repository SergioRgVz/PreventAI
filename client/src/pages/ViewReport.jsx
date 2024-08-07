import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { reportService } from "../hooks/useReports";
import ViewGINSHT from "../components/CrudReports/GINSHT/ViewGINSHT";
import ViewPVD from "../components/CrudReports/PVD/ViewPVD";
import ViewREBA from "../components/CrudReports/REBA/ViewREBA";
import AppBarHome from '../components/utils/AppBarHome';
import { TranslucentBox } from '../components/utils/TranslucentBox';
import { GoBackButton } from '../components/utils/GoBackButton';

const pageToRouteMapping = {
  'Inicio': '/home',
  'Nueva evaluación': '/create-report',
  'Abrir evaluación': '/view-reports',
  'Gestionar': '/management',
};
const settings = [ 'Cerrar sesión'];


export function ViewReport() {
  const { Referencia } = useParams();
  const [report, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);  // Asegúrate de establecer loading en true al inicio de la solicitud
      try {
        const reportData = await reportService.getReportByReferencia(Referencia);
        setReportData(reportData);
        setLoading(false);  // Establece loading en false después de obtener los datos
      } catch (error) {
        setError(error);
        setLoading(false);  // Establece loading en false incluso si hay un error
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [Referencia]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!report) {
    return <div>No se encontró el informe</div>;
  }

  return (
    <>
      <AppBarHome pageToRouteMapping={pageToRouteMapping} settings={settings} logged />
      <TranslucentBox maxWidth={'1100px'}>
      <h1>Detalles del Informe</h1>
      {report.GINSHT && <ViewGINSHT informe={report} />}
        {report.PVD && <ViewPVD informe={report} />}
        {report.REBA && <ViewREBA informe={report} />}
        {!report.GINSHT && !report.PVD && !report.REBA && (
          <div>No hay detalles del informe para mostrar.</div>
        )}
      <GoBackButton />
      </TranslucentBox>
    </>
  );
}
