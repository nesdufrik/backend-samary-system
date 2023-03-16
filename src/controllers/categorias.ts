import { createCategoria, detailCategoria, getAllCategorias } from './../services/categorias';
import { NextFunction, Request, Response } from "express";

export const listAllCategoriasController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllCategorias(req.params.sucursalId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const detailCategoriaController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await detailCategoria(req.params.categoriaId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const createCategoriaController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await createCategoria(req.body, req.params.sucursalId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}