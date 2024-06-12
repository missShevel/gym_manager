import { Router } from 'express';

import userRouter from './users';
import clientsRouter from './clients';
import equipmentRouter from './equipments';
import fileRouter from './files';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientsRouter);
router.use('/equipments', equipmentRouter);
router.use('/files', fileRouter);

export default router;
