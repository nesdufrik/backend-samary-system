import { NextFunction, Request, Response } from "express";
import { verificarToken } from "../utils/jwt.handle";

export const verificacionDeToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtDeUsuario = req.headers.authorization
        const token = jwtDeUsuario?.split(' ').pop()
        const isUser = verificarToken(`${token}`)

        req.body.session = isUser
        next()

    } catch (error) {
        next(error)
    }
}