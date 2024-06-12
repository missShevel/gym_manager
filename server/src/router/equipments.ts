import { Router } from 'express';

import EquipmentController from 'controllers/equipment.controller';
import { authenticator } from 'middlewares';

const router = Router();
const equipmentController = new EquipmentController();

router.post('/', authenticator, equipmentController.create.bind(equipmentController));
router.get('/', authenticator, equipmentController.getAll.bind(equipmentController));
router.get('/:id', authenticator, equipmentController.getById.bind(equipmentController));
router.put('/:id', authenticator, equipmentController.updateById.bind(equipmentController));
router.delete('/:id', authenticator, equipmentController.deleteById.bind(equipmentController));

export default router;
