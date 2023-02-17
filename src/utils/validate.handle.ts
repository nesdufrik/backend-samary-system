import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import { ApiError } from "../class/ApiError"

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        throw new ApiError(403, `Alguno de los campos esta vacio o no es valido`)
    }
}