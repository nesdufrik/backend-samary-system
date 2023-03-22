import { listAllEmpleadosController, createEmpleadoController } from './../controllers/empleados';
import { verificacionDeToken } from './../middleware/session.middleware';
import { errorHandle } from './../utils/error.handle';
import { Router } from "express";

const router = Router()

router.get('/sucursal/:sucursalId', errorHandle(verificacionDeToken), listAllEmpleadosController)
router.get('/:empleadoId', errorHandle(verificacionDeToken),)
router.post('/sucursal/:sucursalId', errorHandle(verificacionDeToken), createEmpleadoController)
router.put('/:empleadoId', errorHandle(verificacionDeToken),)
router.delete('/:empleadoId', errorHandle(verificacionDeToken),)

export { router }