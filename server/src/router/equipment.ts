import {Router} from 'express';

import EquipmentController from 'controllers/equipment.controller';

const router = Router();
const equipmentController = new EquipmentController();


router.post('/', equipmentController.create.bind(equipmentController));

export default router;
