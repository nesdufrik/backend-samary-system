import { createCategoriaController, deleteCategoriaController, detailCategoriaController, listAllCategoriasController, updateCategoriaController } from './../controllers/categorias';
import { verificacionDeToken } from './../middleware/session.middleware';
import { Router } from "express";

const router = Router()

router.get('/sucursal/:sucursalId/', verificacionDeToken, listAllCategoriasController)
router.get('/:categoriaId', verificacionDeToken, detailCategoriaController)
router.post('/sucursal/:sucursalId/', verificacionDeToken, createCategoriaController)
router.put('/:categoriaId', verificacionDeToken, updateCategoriaController)
router.delete('/:categoriaId', verificacionDeToken, deleteCategoriaController)

export { router }