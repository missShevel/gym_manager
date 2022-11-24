import { Router } from 'express';

import EquipmentController from 'controllers/equipment.controller';

const router = Router();
const equipmentController = new EquipmentController();

router.post('/', equipmentController.create.bind(equipmentController));
router.get('/', equipmentController.getAll.bind(equipmentController));
router.get('/:id', equipmentController.getById.bind(equipmentController));
router.put('/:id', equipmentController.updateById.bind(equipmentController));
router.delete('/:id', equipmentController.deleteById.bind(equipmentController));


export default router;
