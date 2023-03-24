import { listAllItemsController, detailItemController, createItemController, updateItemController, deleteItemController } from './../controllers/items';
import { Router } from "express";
import { verificacionDeToken } from "../middleware/session.middleware";
import { errorHandle } from "../utils/error.handle";

const router = Router()

router.get('/sucursal/:sucursalId', verificacionDeToken, listAllItemsController)
router.get('/:itemId', verificacionDeToken, detailItemController)
router.post('/sucursal/:sucursalId', verificacionDeToken, createItemController)
router.put('/:itemId', verificacionDeToken, updateItemController)
router.delete('/:itemId', verificacionDeToken, deleteItemController)

export { router }