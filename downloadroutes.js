// routes/cvRoutes.js
import express from 'express';
import { downloadCV, uploadCV, deleteCV } from '../controller/cv.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'public/cv/' });

router.get('/download-cv', downloadCV);
router.post('/upload-cv', upload.single('cv'), uploadCV);
router.delete('/delete-cv', deleteCV);

export default router;
