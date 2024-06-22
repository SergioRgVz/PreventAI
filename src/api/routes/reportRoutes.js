import express from 'express';
import multer from 'multer';
import path from 'path';
import { getReports, getReportByEmployee, getReportByReferencia, getReportByCompany, createReport, updateReport, createReportPWD, createReportREBA, modifyGINSHT, modifyPWD, deleteReport, deleteReportGINSHT, deleteReportPWD } from '../controllers/reportController.js';
import { fileURLToPath } from 'url';
import { log } from 'console';


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
router.get('/referencia/:referencia', getReportByReferencia)
router.get('/:id', getReportByEmployee);
router.get('/getReport/:company', getReportByCompany);

router.post('/create', createReport);
router.put('/update/:id', updateReport);

// router.post('/create', upload.array('images'), (req, res, next) => {
//     console.log(req.files);
//     console.log(req.body);
//     next();
// }, createReport);


router.delete('/:id', deleteReport);

router.delete('/delete/:Referencia', deleteReport);

export default router;