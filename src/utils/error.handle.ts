import { NextFunction, Request, Response } from "express"
import { ApiError } from "../class/ApiError"

export const errorHandle = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
};

export const errorEndPoint = (req: Request, res: Response, next: NextFunction) => {
    const err = new ApiError(404, `El metodo ${req.method} solicitado a la ruta: ${req.baseUrl}, no se encuentra`)
    next(err);
};

export const responseError = (err: ApiError, req: Request, res: Response, next: NextFunction) => {

    let httpCode = 500

    if (err.name === 'JsonWebTokenError') httpCode = 403
    if (err.name === 'SyntaxError') httpCode = 403
    if (err.name === 'TokenExpiredError') httpCode = 403

    const statusCode = err.statusCode ? err.statusCode : httpCode

    res.status(statusCode).send({
        success: false,
        data: {
            error: `${err.name}`,
            message: `${err.message}`
        }
    })
}