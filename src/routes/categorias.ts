import { createCategoriaController, deleteCategoriaController, detailCategoriaController, listAllCategoriasController, updateCategoriaController } from './../controllers/categorias';
import { verificacionDeToken } from './../middleware/session.middleware';
import { errorHandle } from './../utils/error.handle';
import { Router } from "express";

const router = Router()

router.get('/sucursal/:sucursalId/', errorHandle(verificacionDeToken), listAllCategoriasController)
router.get('/:categoriaId', errorHandle(verificacionDeToken), detailCategoriaController)
router.post('/sucursal/:sucursalId/', errorHandle(verificacionDeToken), createCategoriaController)
router.put('/:categoriaId', errorHandle(verificacionDeToken), updateCategoriaController)
router.delete('/:categoriaId', errorHandle(verificacionDeToken), deleteCategoriaController)

export { router }