import { createCategoriaController, detailCategoriaController, listAllCategoriasController } from './../controllers/categorias';
import { verificacionDeToken } from './../middleware/session.middleware';
import { errorHandle } from './../utils/error.handle';
import { Router } from "express";

const router = Router()

router.get('/sucursal/:sucursalId/', errorHandle(verificacionDeToken), listAllCategoriasController)
router.get('/sucursal/:sucursalId/:categoriaId', errorHandle(verificacionDeToken), detailCategoriaController)
router.post('/sucursal/:sucursalId/', errorHandle(verificacionDeToken), createCategoriaController)
router.put('/sucursal/:sucursalId/:categoriaId', errorHandle(verificacionDeToken))
router.delete('/sucursal/:sucursalId/:categoriaId', errorHandle(verificacionDeToken))

export { router }