import {
    createCategoriaController,
    deleteCategoriaController,
    detailCategoriaController,
    listAllCategoriasController,
    updateCategoriaController,
    posListAllCategoriasController,
} from './../controllers/categorias'
import { verificacionDeToken } from './../middleware/session.middleware'
import { Router } from 'express'

const router = Router()

//Rutas para Administrador
router.get(
    '/sucursal/:sucursalId/',
    verificacionDeToken,
    listAllCategoriasController
)
router.get('/:categoriaId', verificacionDeToken, detailCategoriaController)
router.post(
    '/sucursal/:sucursalId/',
    verificacionDeToken,
    createCategoriaController
)
router.put('/:categoriaId', verificacionDeToken, updateCategoriaController)
router.delete('/:categoriaId', verificacionDeToken, deleteCategoriaController)

//Rutas para Employee
router.get('/pos/get', verificacionDeToken, posListAllCategoriasController)

export { router }
