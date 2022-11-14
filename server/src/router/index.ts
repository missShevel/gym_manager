import { Router } from 'express';

import userRouter from './users';
import clientsRouter from './clients';
import equipmentRouter from './equipment';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientsRouter);
router.use('/equipment', equipmentRouter);

export default router;
