import { Router } from 'express';

import userRouter from './users';
import clientsRouter from './clients';
import equipmentRouter from './equipments';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientsRouter);
router.use('/equipments', equipmentRouter);

export default router;
