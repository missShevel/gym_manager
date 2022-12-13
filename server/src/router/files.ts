import { v4 } from 'uuid';
import { Router } from 'express';
import multer from 'multer';

import FileController from 'controllers/file.controller';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, res, cb) => cb(null, 'files/'),
  filename: (req, res, cb) => {
    const ext = path.extname(res.originalname);
    cb(null, v4() + ext);
  },
});

const upload = multer({ storage });

const router = Router();
const fileController = new FileController();

router.post('/', upload.single('file'), fileController.upload.bind(fileController));
router.get('/:fileId', fileController.download.bind(fileController));

export default router;
