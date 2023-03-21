import { NextFunction, Request, response, Response } from "express";
import { createItem, deleteItem, detailItem, getAllItems, updateItem } from "../services/items";

export const listAllItemsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllItems(req.params.sucursalId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const detailItemController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await detailItem(req.params.itemId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const createItemController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await createItem(req.body, req.params.sucursalId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const updateItemController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await updateItem(req.body, req.params.itemId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const deleteItemController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await deleteItem(req.params.itemId)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}