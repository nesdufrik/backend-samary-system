import {
    listAllItemsController,
    detailItemController,
    createItemController,
    updateItemController,
    deleteItemController,
    posListAllItemsController,
} from './../controllers/items'

import { Router } from 'express'
import { verificacionDeToken } from '../middleware/session.middleware'
import { uploadMiddleware } from '../middleware/storage.middleware'

const router = Router()

router.get('/sucursal/:sucursalId', verificacionDeToken, listAllItemsController)
router.get('/:itemId', verificacionDeToken, detailItemController)
router.post(
    '/sucursal/:sucursalId',
    verificacionDeToken,
    uploadMiddleware.single('image'),
    createItemController
)
router.put(
    '/:itemId',
    verificacionDeToken,
    uploadMiddleware.single('image'),
    updateItemController
)
router.delete('/:itemId', verificacionDeToken, deleteItemController)

//Rutas para Employee
router.get('/pos/get', verificacionDeToken, posListAllItemsController)

export { router }
