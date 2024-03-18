import { ReportGINSHT, ReportPWD } from "../models/reportModel";
import employeeService from "./employeeService";
import companyService from "./companyService";
import Company from "../models/companyModel";

const reportService = {
    getAllReports: async (userId) => {
        try {
            const reports = await ReportGINSHT.find({ User: userId }).exec();
            reports.push(await ReportPWD.find({ User: userId }).exec());
            return reports;
        } catch (error) {
            console.error('Error al buscar informes:', error);
            return null;
        }
    },
    getAllReportsEmployee: async (userId, employee) => {
        try{
            const reports = getAllReports(userId);
            const employeeFound = await employeeService.findEmployee({ DNI: employee });
            reports.filter(report => report.employee === employeeFound.DNI);

            return reports;
        } catch (error) {
            console.error('Error al buscar informes:', error);
            return null;
        }
    },
    getAllReportsCompany: async (userId, company) => {
        try{
            const reports = getAllReports(userId);
            const companyFound = await companyService.findCompany({ name: company });
            reports.filter(report => report.company === companyFound.CIF);

            return reports;
        } catch (error) {
            console.error('Error al buscar informes:', error);
            return null;
        }
    },
    getOneReport: async (userId, reportId) => {
        try {
            // Buscar el informe por su ID en los dos modelos
            const reportGINSHT = await ReportGINSHT.findById(reportId).exec();
            const reportPWD = await ReportPWD.findById(reportId).exec();
            // Si no se encuentra en ninguno, devolver null
            if (!reportGINSHT && !reportPWD) {
                return null;
            }
            // Si se encuentra en alguno, devolver el informe encontrado
            return reportGINSHT || reportPWD;
        } catch (error) {
            console.error('Error al buscar informe por ID:', error);
            return null;
        }
    },
    createReportGINSHT: async (userId, reportData) => {
        try {
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                return null;
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                return null;
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
            return null;
        }
    },
    createReportPWD: async (userId, reportData) => {
        try {
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                return null;
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                return null;
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
            return null;
        }
    },
    modifyGINSHT: async (userId, reportId, reportData) => {
        try {
            const report = await ReportGINSHT.findById(reportId).exec();
            if (!report) {
                return null;
            }
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                return null;
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                return null;
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
            return null;
        }
    },
    modifyPWD: async (userId, reportId, reportData) => {
        try {
            const report = await ReportPWD.findById(reportId).exec();
            if (!report) {
                return null;
            }
            const company = await companyService.findCompanyByCIF(reportData.company);
            if (!company) {
                return null;
            }
            const employee = await employeeService.findEmployee({ DNI: reportData.employee });
            if (!employee) {
                return null;
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
            return null;
        }
    },
    deleteReportGINSHT: async (userId, reportId) => {
        try {
            const report = await ReportGINSHT.findByIdAndDelete(reportId).exec();
            if (!report) {
                return null;
            }
            return report;
        } catch (error) {
            console.error('Error al eliminar informe GINSHT:', error);
            return null;
        }
    },
    deleteReportPWD: async (userId, reportId) => {
        try {
            const report = await ReportPWD.findByIdAndDelete(reportId).exec();
            if (!report) {
                return null;
            }
            return report;
        } catch (error) {
            console.error('Error al eliminar informe PWD:', error);
            return null;
        }
    },
}