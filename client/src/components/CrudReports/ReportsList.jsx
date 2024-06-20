import { DataCard } from '../utils/DataCard'; // Asegúrate de actualizar el import a DataCard
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { reportService } from '../../hooks/useReports';
import { useNavigate } from 'react-router-dom';

export const ReportList = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRemoveReport = (Referencia) => {
        setReports(reports.filter(report => report.Referencia !== Referencia));
    };

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

    const reportConfig = {
        identifierKey: 'Referencia',
        fields: [
            { name: 'Empleado.DNI', label: 'Empleado.DNI' },
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
        editEnabled: true,
        deleteEnabled: true,
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (Array.isArray(reports)) {
        return (
            <Stack spacing={2}>
                {reports.map((report) => (
                    <DataCard
                        item={report}
                        key={report._id}
                        config={reportConfig}
                        onRemove={() => handleRemoveReport(report._id)}
                    />
                ))}
            </Stack>
        );
    } else {
        return <div>Error: La respuesta no es un array.</div>;
    }
};
