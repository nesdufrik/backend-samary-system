import { checkUserJWT } from './../services/auth';
import { NextFunction, Request, Response } from "express"
import { deleteUser, loginAuth, oauthLogin, registerUser, updateUser } from "../services/auth"

export const loginAuthController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await loginAuth(req.body)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }

}

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await registerUser(req.body)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await updateUser(req.body, req.body.session)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await deleteUser(req.body.session)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}

export const verifyJWTController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, permissions } = req.body.session
        const response = await checkUserJWT(id, permissions)
        res.send({
            "success": true,
            "data": {
                "token": true,
                "fullName": response?.fullName,
                "avatar": response?.avatar
            }
        })
    } catch (error) {
        next(error)
    }

}

export const oauthLoginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await oauthLogin(req.body.session.id)
        res.send({
            "success": true,
            "data": response
        })
    } catch (error) {
        next(error)
    }
}