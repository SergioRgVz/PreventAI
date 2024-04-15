import express from 'express';
import { getReports, getReportByEmployee, getReportByCompany, createReportGINSHT, createReportPWD, modifyGINSHT, modifyPWD, deleteReportGINSHT, deleteReportPWD} from '../controllers/reportController.js';   

const router = express.Router();

router.get('/', getReports);
router.get('/:id', getReportByEmployee);
router.get('/getReport/:company', getReportByCompany);
router.post('/createGINSHT', createReportGINSHT);
router.post('/createPWD', createReportPWD);
router.put('/modifyGINSHT/:id', modifyGINSHT);
router.put('/modifyPWD/:id', modifyPWD);
router.delete('/deleteGINSHT/:id', deleteReportGINSHT);
router.delete('/deletePWD/:id', deleteReportPWD);

export default router;