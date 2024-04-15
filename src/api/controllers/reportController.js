import userService from '../services/userService.js';
import reportService from '../services/reportService.js';
import HttpError from '../../utils/HttpError.js';

export const getReports = async (req, res) => {
    const userId = req.user.userId;

    try {
        const reports = await reportService.getAllReports(userId);
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

export const createReportGINSHT = async (req, res) => {
    const userId = req.user.userId;
    const reportData = req.body;
    try {
        const report = await reportService.createReportGINSHT(userId, reportData);
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
    try {
        const report = await reportService.createReportPWD(userId, reportData);
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