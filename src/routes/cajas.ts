import { Router } from 'express'
import { verificacionDeToken } from '../middleware/session.middleware'
import {
    getAllCajasController,
    getCajaController,
    postCajaController,
    putCajaController,
} from '../controllers/cajas'

const router = Router()

router.get('/', verificacionDeToken, getCajaController)
router.get('/all', verificacionDeToken, getAllCajasController)
router.post('/', verificacionDeToken, postCajaController)
router.put('/:cajaId', verificacionDeToken, putCajaController)

export { router }
