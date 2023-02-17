import { NextFunction, Request, Response } from "express"
import { check } from "express-validator"
import { validateResult } from "../utils/validate.handle"

export const validateRegisterUsuario = [
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().isStrongPassword(),
    check('fullName').exists().notEmpty().isString(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResult(req, res, next)
    }

]

export const validateLogin = [
    check('email').exists().notEmpty().isString(),
    check('password').exists().notEmpty().isString(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResult(req, res, next)
    }
]

export const validateUpdateUsuario = [
    check('fullName').optional().notEmpty().isString(),
    check('password').optional().notEmpty().isStrongPassword(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResult(req, res, next)
    }
]