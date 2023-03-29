
import { NextFunction, Request, Response } from "express";
import { actualizarCliente, agregarCliente, borrarCliente, detalleCliente, listarClientes } from "../services/clientes";


export const getClientsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await listarClientes()
        res.send({
            success: true,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

export const getClientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await detalleCliente(req.params.nit)
        res.send({
            success: true,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

export const postClientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await agregarCliente(req.body)
        res.send({
            success: true,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

export const putClientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await actualizarCliente(req.params.nit, req.body)
        res.send({
            success: true,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

export const deleteClientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await borrarCliente(req.params.nit)
        res.send({
            success: true,
            data: response
        })
    } catch (error) {
        next(error)
    }
}