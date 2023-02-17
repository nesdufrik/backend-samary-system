import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validateResult } from '../utils/validate.handle';

export const validateCreateEmpresa = [
    check('name').exists().notEmpty().isString(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResult(req, res, next)
    }
]

export const validateCreateSucursal = [
    check('name').exists().notEmpty().isString(),
    check('direccion').exists().notEmpty().isString(),
    check('telefono').exists().notEmpty().isString(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResult(req, res, next)
    }
]