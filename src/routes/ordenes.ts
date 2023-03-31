import { getOrdenesController, postOrdenController, getOrdenesTotalesController, getOrdenesItemsController } from './../controllers/ordenes';
import { verificacionDeToken } from './../middleware/session.middleware';
import { Router } from "express";

const router = Router()

router.get('/sucursal/:sucursalId', verificacionDeToken, getOrdenesController)
router.get('/sucursal/:sucursalId/total', verificacionDeToken, getOrdenesTotalesController)
router.get('/sucursal/:sucursalId/item', verificacionDeToken, getOrdenesItemsController)
router.get('/id/:ordenId', verificacionDeToken,)
router.post('/sucursal/:sucursalId', verificacionDeToken, postOrdenController)
router.put('/id/:ordenId', verificacionDeToken,)
router.delete('/id/:ordenId', verificacionDeToken,)

export { router }