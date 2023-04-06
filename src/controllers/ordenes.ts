import {
    listarOrdenes,
    agregarOrden,
    ordenesPorTotal,
    ordenesPorItem,
    actualizarOrden,
    getOrdenesSucursal,
    deleteOrden,
} from './../services/ordenes'
import { NextFunction, Request, Response } from 'express'

export const getOrdenesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await listarOrdenes(req.params.sucursalId)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const getOrdenesTotalesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const desde: string = req.query.desde as string
        const hasta: string = req.query.hasta as string

        if (!desde || !hasta) {
            throw new Error("Los parámetros 'desde' y 'hasta' son obligatorios")
        }

        const response = await ordenesPorTotal(
            req.params.sucursalId,
            desde,
            hasta
        )
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const getOrdenesItemsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const desde: string = req.query.desde as string
        const hasta: string = req.query.hasta as string

        if (!desde || !hasta) {
            throw new Error("Los parámetros 'desde' y 'hasta' son obligatorios")
        }
        const response = await ordenesPorItem(
            req.params.sucursalId,
            desde,
            hasta
        )
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const postOrdenController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await agregarOrden(req.body, req.body.session)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const putOrdenController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await actualizarOrden(req.params.ordenId, req.body)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const getOrdenesSucursalController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await getOrdenesSucursal(req.body.session)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteOrdenController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await deleteOrden(req.params.ordenId)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}
