// ReportsLitsButton.js
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataListButton } from '../utils/DataListButton'; 
import { useNavigate } from 'react-router-dom';
import { reportService } from '../../hooks/useReports';


export const ReportsListButton = ({ handleReportSelect, children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await reportService.getReports();
            setReports(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    fetchReports();
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (Array.isArray(reports) && reports.length === 0) {
    return <div>No se encuentran informes.</div>;
  }

  const handleReportClick = (report) => {
    if (report) {
        handleReportSelect(report);
      navigate(`/management/modify-report/${report.Referencia}`);
    }
  };

  const reportConfig = {
    identifierKey: 'Referencia',
    fields: [
        { name: 'Empleado.DNI', label: 'DNI' },
        { name: 'Empleado.Empresa.CIF', label: 'Empresa' },
        { name: 'Empleado.PuestoTrabajo', label: 'Puesto de Trabajo' },
        { name: 'Fecha', label: 'Fecha' },
        { name: 'Referencia', label: 'Referencia'},
        { name: 'tipo', label: 'Tipo'}
    ],
    onView: (report) => {
        console.log("Viendo informe", report);
        navigate(`/management/view-report/${report.Referencia}`);
    },
    onEdit: (report) => {
        console.log("Editando informe", report);
    },
    deleteService: async (Referencia) => {
        await reportService.deleteReport(Referencia);
    },
    viewEnabled: true,
    editEnabled: false,
    deleteEnabled: true,
};

  return (
    <Stack spacing={2}>
      <DataListButton
        onItemSelect={handleReportClick} 
        service={{ getItems: async () => reports }}
        config={reportConfig}
      >
        {children}
      </DataListButton>
    </Stack>
  );
};
