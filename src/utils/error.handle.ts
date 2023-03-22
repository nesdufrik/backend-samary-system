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
    let message = err.message

    if (err.name === 'JsonWebTokenError') { httpCode = 403; message = "El token de sesión utilizado esta malformado. Le recomendamos que intente iniciar sesión nuevamente y, si el problema persiste, póngase en contacto con el soporte técnico." }
    if (err.name === 'SyntaxError') { httpCode = 403; message = "El token de sesión no se pudo decodificar correctamente debido a un error de sintaxis. Le recomendamos que intente iniciar sesión nuevamente y, si el problema persiste, póngase en contacto con el soporte técnico." }
    if (err.name === 'TokenExpiredError') { httpCode = 403; message = "El tiempo de vida del token de sesión ha expirado. Le recomendamos que intente iniciar sesión nuevamente" }

    const statusCode = err.statusCode ? err.statusCode : httpCode

    res.status(statusCode).send({
        success: false,
        data: {
            error: `Error`,
            message: `${message}`
        }
    })
}