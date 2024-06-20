import userService from '../services/userService.js';
import reportService from '../services/reportService.js';
import HttpError from '../../utils/HttpError.js';
import { validateReportGINSHTData } from '../../utils/validateReports.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });  // Configura multer para guardar archivos en la carpeta 'uploads'

export const getReports = async (req, res) => {
    const userId = req.user.userId;

    try {
        const reports = await reportService.getReports(userId);
        res.status(200).json(reports);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const getReportByEmployee = async (req, res) => {
    const userId = req.user.userId;
    const { employeeDNI } = req.params;
    try {
        const reports = await reportService.getAllReportsEmployee(userId, employeeDNI);
        if (reports.length > 0) {
            res.status(200).json(reports);
        }
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const getReportByReferencia = async (req, res) => {
    const referencia = req.params.referencia;
    try {
        const report = await reportService.getReportByReference(referencia);
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).json({ message: 'Reporte no encontrado' });
        }
    }
    catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}


export const getReportByCompany = async (req, res) => {
    const userId = req.user.userId;
    const { companyCIF } = req.params;
    try {
        const reports = await reportService.getAllReportsCompany(userId, companyCIF);
        if (reports.length > 0) {
            res.status(200).json(reports);
        }
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const createReport = async (req, res) => {
    const ID_Usuario = req.user.userId;
    const reportData = req.body;

    // const validationErrors = validateReportGINSHTData(reportData);
    // if (validationErrors.length > 0) {
    //     return res.status(400).json({ errors: validationErrors });
    // }

    try {
        reportData.ID_Usuario = ID_Usuario;
        const report = await reportService.createReport(reportData);
        res.status(201).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const createReportPWD = async (req, res) => {
    const userId = req.user.userId;
    const reportData = req.body; 
    const files = req.files; 

    try {
        const imagePaths = files.map(file => file.path);

        reportData.images = imagePaths;

        const report = await reportService.createReportPWD(userId, reportData);
        res.status(201).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};




export const createReportREBA = async (req, res) => {
    const userId = req.user.userId;
    const reportData = req.body;
    try {
        const imagePaths = files.map(file => file.path);

        reportData.images = imagePaths;
        const report = await reportService.createReportREBA(userId, reportData);
        res.status(201).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

}

export const modifyGINSHT = async (req, res) => {
    const userId = req.user.userId;
    const reportId = req.params.id;
    const reportData = req.body;
    try {
        const report = await reportService.modifyGINSHT(userId, reportId, reportData);
        res.status(200).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const modifyPWD = async (req, res) => {
    const userId = req.user.userId;
    const reportId = req.params.id;
    const reportData = req.body;
    try {
        const report = await reportService.modifyPWD(userId, reportId, reportData);
        res.status(200).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const deleteReport = async (req, res) => {
    const Referencia = req.params.id;
    try {
        const report = await reportService.deleteReportByReferencia(Referencia);
        res.status(200).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const deleteReportGINSHT = async (req, res) => {
    const userId = req.user.userId;
    const reportId = req.params.id;
    try {
        const report = await reportService.deleteReportGINSHT(userId, reportId);
        res.status(200).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export const deleteReportPWD = async (req, res) => {
    const userId = req.user.userId;
    const reportId = req.params.id;
    try {
        const report = await reportService.deleteReportPWD(userId, reportId);
        res.status(200).json(report);
    } catch (error) {
        if (error instanceof HttpError) {
            res.status(error.status).json({ message: error.message });
        } else {

            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}