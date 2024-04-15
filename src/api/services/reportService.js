import ReportGINSHT from "../models/reportModel.js";
import  ReportPWD from "../models/reportModel.js";
import employeeService from "./employeeService.js";
import companyService from "./companyService.js";
import Company from "../models/companyModel.js";
import HttpError from "../../utils/HttpError.js";

const reportService = {
    getAllReports: async (userId) => {
        if (!userId) {
            throw new HttpError(400, 'Falta el userId');
        }
        try {
            const reports = await ReportGINSHT.find({ User: userId }).exec();
            if (!reports || reports.length === 0) {
                throw new HttpError(404, 'No se encontraron informes para el usuario proporcionado.');
            }
            reports.push(await ReportPWD.find({ User: userId }).exec());
            return reports;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            console.error('Error al buscar informes:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    getAllReportsEmployee: async (userId, employee) => {
        if (!userId) {
            throw new HttpError(400, 'Falta el userId');
        }
        if (!employee) {
            throw new HttpError(400, 'Falta el DNI del empleado');
        }
        try {
            const reports = await getAllReports(userId);
            if (!reports || reports.length === 0) {
                throw new HttpError(404, 'No se encontraron informes para el usuario proporcionado.');
            }

            const employeeFound = await employeeService.findEmployee({ DNI: employee });
            if (!employeeFound) {
                throw new HttpError(404, 'No se encontró el empleado con el DNI proporcionado.');
            }

            const filteredReports = reports.filter(report => report.employee === employeeFound.DNI);
            if (!filteredReports || filteredReports.length === 0) {
                throw new HttpError(204, 'No se encontraron informes para el empleado especificado.');
            }

            return filteredReports;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            console.error('Error al buscar informes:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    getAllReportsCompany: async (userId, company) => {
        if (!userId) {
            throw new HttpError(400, 'Falta el userId');
        }
        if (!company) {
            throw new HttpError(400, 'Falta el CIF de la empresa');
        }
        try {
            const reports = await reportService.getAllReports(userId);
            const companyFound = await companyService.findCompany({ CIF: company });
            if (!companyFound) {
                throw new HttpError(404, 'No se encontró la empresa con el CIF proporcionado.');
            }

            const filteredReports = reports.filter(report => report.company.toString() === companyFound._id.toString());
            if (filteredReports.length === 0) {
                throw new HttpError(204, 'No se encontraron informes para la empresa especificada.');
            }

            return filteredReports;
        } catch (error) {
            console.error('Error al buscar informes:', error);
            throw error; // Relanzamos el error
        }
    },
    getOneReport: async (userId, reportId) => {
        if (!userId || !reportId) {
            throw new HttpError(400, 'Falta el userId o el reportId');
        }
        try {
            const reportGINSHT = await ReportGINSHT.findById(reportId).exec();
            const reportPWD = await ReportPWD.findById(reportId).exec();
            if (!reportGINSHT && !reportPWD) {
                throw new HttpError(404, 'No se encontró el informe solicitado.');
            }
            let report = reportGINSHT || reportPWD;
            if (report.User.toString() !== userId) {
                throw new HttpError(403, 'No está autorizado para ver este informe.');
            }
            return report;
        } catch (error) {
            console.error('Error al buscar informe por ID:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    createReportGINSHT: async (userId, reportData) => {
        if (!userId || !reportData) {
            throw new HttpError(400, 'Falta información necesaria para crear el informe.');
        }
        try {
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                throw new HttpError(404, 'No se encontró la empresa especificada.');
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                throw new HttpError(404, 'No se encontró el empleado especificado.');
            }
            const report = new ReportGINSHT({
                ...reportData,
                User: userId,
                company: company._id,
                employee: employee._id
            });
            await report.save();
            return report;
        } catch (error) {
            console.error('Error al crear informe GINSHT:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    createReportPWD: async (userId, reportData) => {
        if (!userId || !reportData) {
            throw new HttpError(400, 'Falta información necesaria para crear el informe.');
        }
        try {
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                throw new HttpError(404, 'No se encontró la empresa especificada.');
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                throw new HttpError(404, 'No se encontró el empleado especificado.');
            }
            const report = new ReportPWD({
                ...reportData,
                User: userId,
                company: company._id,
                employee: employee._id
            });
            await report.save();
            return report;
        } catch (error) {
            console.error('Error al crear informe PWD:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    modifyGINSHT: async (userId, reportId, reportData) => {
        if (!userId || !reportId || !reportData) {
            throw new HttpError(400, 'Falta información necesaria para modificar el informe.');
        }
        try {
            const report = await ReportGINSHT.findById(reportId).exec();
            if (!report) {
                throw new HttpError(404, 'No se encontró el informe especificado.');
            }
            // Similar a create, verificamos la empresa y el empleado antes de proceder
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                throw new HttpError(404, 'No se encontró la empresa especificada.');
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                throw new HttpError(404, 'No se encontró el empleado especificado.');
            }
            report.set({
                ...reportData,
                company: company._id,
                employee: employee._id
            });
            await report.save();
            return report;
        } catch (error) {
            console.error('Error al modificar informe GINSHT:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    modifyPWD: async (userId, reportId, reportData) => {
        if (!userId || !reportId || !reportData) {
            throw new HttpError(400, 'Falta información necesaria para modificar el informe.');
        }
        try {
            const report = await ReportPWD.findById(reportId).exec();
            if (!report) {
                throw new HttpError(404, 'No se encontró el informe especificado.');
            }
            // Similar a create, verificamos la empresa y el empleado antes de proceder
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                throw new HttpError(404, 'No se encontró la empresa especificada.');
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                throw new HttpError(404, 'No se encontró el empleado especificado.');
            }
            report.set({
                ...reportData,
                company: company._id,
                employee: employee._id
            });
            await report.save();
            return report;
        } catch (error) {
            console.error('Error al modificar informe PWD:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    deleteReportGINSHT: async (userId, reportId) => {
        if (!userId || !reportId) {
            throw new HttpError(400, 'Falta información necesaria para eliminar el informe.');
        }
        try {
            const report = await ReportGINSHT.findByIdAndDelete(reportId).exec();
            if (!report) {
                throw new HttpError(404, 'No se encontró el informe especificado para eliminar.');
            }
            return report;
        } catch (
        error) {
            console.error('Error al eliminar informe GINSHT:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
    deleteReportPWD: async (userId, reportId) => {
        if (!userId || !reportId) {
            throw new HttpError(400, 'Falta información necesaria para eliminar el informe.');
        }
        try {
            const report = await ReportPWD.findByIdAndDelete(reportId).exec();
            if (!report) {
                throw new HttpError(404, 'No se encontró el informe especificado para eliminar.');
            }
            return report;
        } catch (
        error) {
            console.error('Error al eliminar informe PWD:', error);
            throw new HttpError(500, 'Error interno del servidor');
        }
    },
};

export default reportService;