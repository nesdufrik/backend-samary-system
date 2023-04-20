import { posGetAllItems } from './../services/items'
import { NextFunction, Request, response, Response } from 'express'
import {
    createItem,
    deleteItem,
    detailItem,
    getAllItems,
    updateItem,
} from '../services/items'

export const listAllItemsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await getAllItems(req.params.sucursalId)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const detailItemController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await detailItem(req.params.itemId)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const createItemController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const public_url = process.env.PUBLIC_URL
        req.body.image = `${public_url}/${req.file?.filename}`

        const response = await createItem(req.body, req.params.sucursalId)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const updateItemController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await updateItem(req.body, req.params.itemId)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

export const deleteItemController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await deleteItem(req.params.itemId)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}

// Controller para POS Employee

export const posListAllItemsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await posGetAllItems(req.body.session.id)
        res.send({
            success: true,
            data: response,
        })
    } catch (error) {
        next(error)
    }
}
