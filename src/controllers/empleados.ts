import { getAllEmpleados, createEmpleado, deleteEmpleado, detailEmpleado, updateEmpleado } from './../services/empleados';
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

export const detailEmpleadoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await detailEmpleado(req.params.empleadoId)
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

export const updateEmpleadoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await updateEmpleado(req.body, req.params.empleadoId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const deleteEmpleadoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await deleteEmpleado(req.params.empleadoId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}