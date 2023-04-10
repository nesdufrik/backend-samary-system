import {
    getOrdenesController,
    postOrdenController,
    getOrdenesTotalesController,
    getOrdenesItemsController,
    putOrdenController,
    getOrdenesSucursalController,
    deleteOrdenController,
    pagarOrdenController,
    getOrdenesTerminadasController,
} from './../controllers/ordenes'
import { verificacionDeToken } from './../middleware/session.middleware'
import { Router } from 'express'

const router = Router()

router.get('/sucursal/:sucursalId', verificacionDeToken, getOrdenesController)
router.get(
    '/sucursal/:sucursalId/total',
    verificacionDeToken,
    getOrdenesTotalesController
)
router.get(
    '/sucursal/:sucursalId/item',
    verificacionDeToken,
    getOrdenesItemsController
)

//employee acctions
// router.get('/id/:ordenId', verificacionDeToken)
router.get('/id', verificacionDeToken, getOrdenesSucursalController)
router.get('/terminadas', verificacionDeToken, getOrdenesTerminadasController)
router.post('/id', verificacionDeToken, postOrdenController)
router.put('/id/:ordenId', verificacionDeToken, putOrdenController)
router.delete('/id/:ordenId', verificacionDeToken, deleteOrdenController)
router.put('/pagar/:ordenId', verificacionDeToken, pagarOrdenController)

export { router }
