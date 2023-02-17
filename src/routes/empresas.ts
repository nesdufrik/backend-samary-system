import { Router } from "express";
import { createEmpresaController, createSucursalController, deleteEmpresaController, deleteSucursalController, detailEmpresaController, detailSucursalController, listAllEmpresasController, listAllSucursalesController, updateEmpresaController, updateSucursalController } from "../controllers/empresas";
import { verificacionDeToken } from "../middleware/session.middleware";
import { errorHandle } from "../utils/error.handle";

const router = Router()

//all
router.get('/', errorHandle(verificacionDeToken), listAllEmpresasController)
router.get('/:empresa/sucursal', errorHandle(verificacionDeToken), listAllSucursalesController)

//detail
router.get('/:id', errorHandle(verificacionDeToken), detailEmpresaController)
router.get('/sucursal/:id', errorHandle(verificacionDeToken), detailSucursalController)

//create
router.post('/', errorHandle(verificacionDeToken), createEmpresaController)
router.post('/:empresa/sucursal', errorHandle(verificacionDeToken), createSucursalController)

//update
router.put('/:id', errorHandle(verificacionDeToken), updateEmpresaController)
router.put('/sucursal/:id', errorHandle(verificacionDeToken), updateSucursalController)

//delete
router.delete('/:id', errorHandle(verificacionDeToken), deleteEmpresaController)
router.delete('/sucursal/:id', errorHandle(verificacionDeToken), deleteSucursalController)

export { router }