import { createEmpresa, createSucursal, getAllEmpresas, getAllSucursales, detailEmpresa, detailSucursal, updateEmpresa, updateSucursal, deleteEmpresa, deleteSucursal } from './../services/empresas';
import { NextFunction, Request, Response } from "express";

export const listAllEmpresasController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllEmpresas(req.body.session)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const listAllSucursalesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllSucursales(req.params.empresa)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const detailEmpresaController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await detailEmpresa(req.params.id)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const detailSucursalController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await detailSucursal(req.params.id)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const createEmpresaController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await createEmpresa(req.body, req.body.session)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const createSucursalController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await createSucursal(req.body, req.params.empresa)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const updateEmpresaController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await updateEmpresa(req.body, req.params.id)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const updateSucursalController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await updateSucursal(req.body, req.params.id)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const deleteEmpresaController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await deleteEmpresa(req.params.id)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const deleteSucursalController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await deleteSucursal(req.params.id)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}