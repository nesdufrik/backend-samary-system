import { NextFunction, Request, Response } from 'express'
import {
    actualizarCaja,
    crearCaja,
    getAllCajas,
    getCaja,
    getCajasSucursal,
    getCajasSucursalDates,
} from '../services/cajas'

export const getCajaController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await getCaja(req.body.session)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const getAllCajasController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await getAllCajas(req.body.session)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const getCajasSucursalController = async (
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

        const response = await getCajasSucursalDates(
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

export const postCajaController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await crearCaja(req.body, req.body.session)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const putCajaController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await actualizarCaja(req.params.cajaId, req.body)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}
