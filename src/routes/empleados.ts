import { listAllEmpleadosController, createEmpleadoController, deleteEmpleadoController, detailEmpleadoController, updateEmpleadoController } from './../controllers/empleados';
import { verificacionDeToken } from './../middleware/session.middleware';
import { Router } from "express";

const router = Router()

router.get('/sucursal/:sucursalId', verificacionDeToken, listAllEmpleadosController)
router.get('/:empleadoId', verificacionDeToken, detailEmpleadoController)
router.post('/sucursal/:sucursalId', verificacionDeToken, createEmpleadoController)
router.put('/:empleadoId', verificacionDeToken, updateEmpleadoController)
router.delete('/:empleadoId', verificacionDeToken, deleteEmpleadoController)

export { router }