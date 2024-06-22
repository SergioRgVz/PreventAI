import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reportService } from "../hooks/useReports";
import { GINSHTFormulary } from "../components/CrudReports/GINSHT/GINSHTFormulary";
import { PVDFormulary } from "../components/CrudReports/PVD/PVDFormulary";
import { REBAFormulary } from "../components/CrudReports/REBA/REBAFormulary";
import AppBarHome from "../components/utils/AppBarHome";

const pageToRouteMapping = {
    'Inicio': '/home',
    'Nueva evaluación': '/create-report',
    'Abrir evaluación': '/view-reports',
    'Gestionar': '/management',
  };
  const settings = [ 'Cerrar sesión'];

export const EditReport = () => {
  const { Referencia } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const reportData = await reportService.getReportByReferencia(Referencia);
        setReport(reportData);
        } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, [Referencia]);

  const renderFormulary = () => {
    switch (report.tipo) {
      case 'GINSHT':
        return <GINSHTFormulary report={report} />;
      case 'PVD':
        return <PVDFormulary report={report} />;
      case 'REBA':
        return <REBAFormulary report={report} />;
      default:
        return <div>Tipo de informe no reconocido</div>;
    }
  };

  return (
    <>
      <AppBarHome
        pageToRouteMapping={pageToRouteMapping}
        settings={settings}
        logged
      />
      {report ? (
        <div>
          {renderFormulary()}
        </div>
      ) : (
        <div>Cargando informe...</div>
      )}
    </>
  );
};
