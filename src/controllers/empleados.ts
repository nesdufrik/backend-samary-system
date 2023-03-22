import { getAllEmpleados, createEmpleado } from './../services/empleados';
import { NextFunction, Request, Response } from "express";

export const listAllEmpleadosController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllEmpleados(req.params.sucursalId)
        res.send({
            "success": true,
            "data": response
        })

    } catch (error) {
        next(error)
    }
}

export const createEmpleadoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await createEmpleado(req.body, req.params.sucursalId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}