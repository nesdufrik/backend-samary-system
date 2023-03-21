import { Router } from "express";
import { verificacionDeToken } from "../middleware/session.middleware";
import { errorHandle } from "../utils/error.handle";

const router = Router()

router.get('/sucursal/:sucursalId', errorHandle(verificacionDeToken),)
router.get('/:itemId', errorHandle(verificacionDeToken),)
router.post('/sucursal/:sucursalId', errorHandle(verificacionDeToken),)
router.put('/:itemId', errorHandle(verificacionDeToken),)
router.delete('/:itemId', errorHandle(verificacionDeToken),)

export { router }