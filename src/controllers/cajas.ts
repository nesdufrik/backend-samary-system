import { NextFunction, Request, Response } from 'express'
import { actualizarCaja, crearCaja, getCaja } from '../services/cajas'

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
