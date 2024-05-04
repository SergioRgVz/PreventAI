import { DataCard } from '../utils/DataCard'; // Asegúrate de actualizar el import a DataCard
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { reportService } from '../../hooks/useReports';

export const ReportList = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRemoveReport = (CIF) => {
        setReports(reports.filter(report => report.CIF !== CIF));
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
        identifierKey: '_id',
        fields: [
            { name: 'empleado', label: 'Empleado' },
            { name: 'empresa', label: 'Empresa' },
            { name: 'centroDeTrabajo', label: 'Centro de Trabajo' },
            { name: 'puestoDeTrabajo', label: 'Puesto de Trabajo' },
            { name: 'fecha', label: 'Fecha' },
        ],
        onView: (report) => {
            console.log("Viendo informe", report);
        },
        onEdit: (report) => {
            console.log("Editando informe", report);
        },
        deleteService: async (_id) => {
            await reportService.deleteReport(_id);
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
