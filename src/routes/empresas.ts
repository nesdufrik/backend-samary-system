import { Router } from "express";
import { createEmpresaController, createSucursalController, deleteEmpresaController, deleteSucursalController, detailEmpresaController, detailSucursalController, listAllEmpresasController, listAllSucursalesController, updateEmpresaController, updateSucursalController } from "../controllers/empresas";
import { verificacionDeToken } from "../middleware/session.middleware";
import { errorHandle } from "../utils/error.handle";

const router = Router()

//all
router.get('/', verificacionDeToken, listAllEmpresasController)
router.get('/:empresa/sucursal', verificacionDeToken, listAllSucursalesController)

//detail
router.get('/:id', verificacionDeToken, detailEmpresaController)
router.get('/sucursal/:id', verificacionDeToken, detailSucursalController)

//create
router.post('/', verificacionDeToken, createEmpresaController)
router.post('/:empresa/sucursal', verificacionDeToken, createSucursalController)

//update
router.put('/:id', verificacionDeToken, updateEmpresaController)
router.put('/sucursal/:id', verificacionDeToken, updateSucursalController)

//delete
router.delete('/:id', verificacionDeToken, deleteEmpresaController)
router.delete('/sucursal/:id', verificacionDeToken, deleteSucursalController)

export { router }