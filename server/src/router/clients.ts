import { Router } from 'express';

import ClientController from 'controllers/client.controller';

const router = Router();
const clientController = new ClientController();

router.post('/', clientController.create.bind(clientController));
router.get('/', clientController.getAll.bind(clientController));
router.get('/:id', clientController.getById.bind(clientController));
router.put('/:id', clientController.updateById.bind(clientController));

export default router;
