import { authenticator } from 'middlewares';
import { Router } from 'express';
import ClientController from 'controllers/client.controller';

const router = Router();
const clientController = new ClientController();

router.post('/', authenticator, clientController.create.bind(clientController));
router.get('/', authenticator, clientController.getAll.bind(clientController));
router.get('/:id', authenticator, clientController.getById.bind(clientController));
router.put('/:id', authenticator, clientController.updateById.bind(clientController));
router.delete('/:id', authenticator, clientController.deleteById.bind(clientController));

export default router;
