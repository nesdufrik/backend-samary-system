import { listAllItemsController, detailItemController, createItemController, updateItemController, deleteItemController } from './../controllers/items';
import { Router } from "express";
import { verificacionDeToken } from "../middleware/session.middleware";
import { errorHandle } from "../utils/error.handle";

const router = Router()

router.get('/sucursal/:sucursalId', errorHandle(verificacionDeToken), listAllItemsController)
router.get('/:itemId', errorHandle(verificacionDeToken), detailItemController)
router.post('/sucursal/:sucursalId', errorHandle(verificacionDeToken), createItemController)
router.put('/:itemId', errorHandle(verificacionDeToken), updateItemController)
router.delete('/:itemId', errorHandle(verificacionDeToken), deleteItemController)

export { router }