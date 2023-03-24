import { ApiError } from './../class/ApiError';
import { NextFunction, Request, Response } from "express"

export const checkRol = (roles: Array<string>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const { permissions } = req.body.session
        if (!roles.includes(permissions)) {
            throw new ApiError(401, "No tienes permisos")
        }
        next()
    } catch (error) {
        next(error)
    }
}