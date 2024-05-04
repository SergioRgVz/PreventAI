import express from 'express';
import multer from 'multer';
import path from 'path';
import { getReports, getReportByEmployee, getReportByCompany, createReportGINSHT, createReportPWD, createReportREBA, modifyGINSHT, modifyPWD, deleteReport, deleteReportGINSHT, deleteReportPWD } from '../controllers/reportController.js';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get('/', getReports);
router.get('/:id', getReportByEmployee);
router.get('/getReport/:company', getReportByCompany);

router.post('/createPWD', upload.array('images'), (req, res, next) => {
    console.log(req.files);
    console.log(req.body);
    next();
}, createReportPWD);

router.post('/createREBA', upload.array('images'), (req, res, next) => {
    console.log(req.files);
    console.log(req.body);
    next();
}, createReportREBA);

router.post('/createGINSHT', upload.array('images'), (req, res, next) => {
    console.log(req.files);
    console.log(req.body);
    next();
}, createReportGINSHT);

router.put('/modifyGINSHT/:id', modifyGINSHT);
router.put('/modifyPWD/:id', modifyPWD);

router.delete('/:id', deleteReport);
router.delete('/deleteGINSHT/:id', deleteReportGINSHT);
router.delete('/deletePWD/:id', deleteReportPWD);

export default router;