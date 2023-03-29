import { getClientsController, getClientController, postClientController, putClientController, deleteClientController } from './../controllers/clientes';
import { verificacionDeToken } from './../middleware/session.middleware';
import { Router } from "express";

const router = Router()

router.get('/', verificacionDeToken, getClientsController)
router.get('/:nit', verificacionDeToken, getClientController)
router.post('/', verificacionDeToken, postClientController)
router.put('/:nit', verificacionDeToken, putClientController)
router.delete('/:nit', verificacionDeToken, deleteClientController)

export { router }