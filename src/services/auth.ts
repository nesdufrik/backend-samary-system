import { generarToken } from './../utils/jwt.handle';
import { ApiError } from "../class/ApiError";
import { LoginAuthType, Usuario, UsuarioUpdate } from "../interfaces/usuario.interface";
import { EmpleadoModel, UsuarioModel } from "../models/usuario.model";
import { encriptar, verificar } from "../utils/bcrypt.handle";
import { JwtPayload } from 'jsonwebtoken';

export const loginAuth = async (data: LoginAuthType) => {
    let permissions = ""
    let logInAdmin
    let checkIs = await UsuarioModel.findOne({ email: data.email })

    if (!checkIs) {
        checkIs = await EmpleadoModel.findOne({ email: data.email })
        if (!checkIs) {
            throw new ApiError(401, `Por favor revisa tu usuario y contraseña. Los campos son sensibles a mayúsculas y minúsculas`)
        }
        permissions = "employee"
        logInAdmin = false
    } else {
        permissions = "administrator"
        logInAdmin = true
    }

    const isCorrect = await verificar(data.password, checkIs.password)
    if (!isCorrect) throw new ApiError(401, `Por favor revisa tu usuario y contraseña. Los campos son sensibles a mayúsculas y minúsculas`)

    const payload = {
        id: checkIs._id,
        name: checkIs.fullName,
        permissions,
    }
    const tokenSession = generarToken(payload)
    const dataSession = {
        logInAdmin,
        name: checkIs.fullName,
        token: tokenSession,
        avatar: checkIs.avatar
    }

    return dataSession
}

export const registerUser = async (data: Usuario) => {
    const checkIs = await UsuarioModel.findOne({ email: data.email })
    if (checkIs) throw new ApiError(403, `El usuario ya esta siendo utilizado`)

    const passHash = await encriptar(data.password)
    const registrar = await UsuarioModel.create({
        email: data.email,
        password: passHash,
        fullName: data.fullName
    })

    return registrar
}

export const updateUser = async (data: UsuarioUpdate, session: JwtPayload) => {

    const checkIs = await UsuarioModel.findOne({ _id: session.id })
    if (!checkIs) throw new ApiError(404, `El usuario ya no existe`)

    !data.fullName ? data.fullName = checkIs.fullName : data.fullName = data.fullName
    !data.password ? data.password = checkIs.password : data.password = await encriptar(data.password)
    !data.avatar ? data.avatar = checkIs.avatar : data.avatar = data.avatar

    const actualizar = UsuarioModel.findOneAndUpdate({ _id: session.id }, {
        fullName: data.fullName,
        password: data.password,
        avatar: data.avatar
    }, { new: true })
    return actualizar
}

export const deleteUser = async (session: JwtPayload) => {
    const checkIs = await UsuarioModel.findOne({ _id: session.id })
    if (!checkIs) throw new ApiError(404, `El usuario ya no existe`)

    const eliminar = UsuarioModel.deleteOne({ _id: session.id })
    return eliminar
}

export const oauthLogin = async (id: string) => {
    const checkIs = await EmpleadoModel.findOne({ _id: id }, { "fullName": 1, "avatar": 1 })
    if (!checkIs) throw new ApiError(401, `¡Advertencia! El token que intentas usar pertenece a un usuario que ya no está activo en nuestro sistema. Por favor, inicia sesión con tu propia cuenta para continuar usando nuestros servicios. Si tienes problemas para acceder a tu cuenta, por favor contáctanos para recibir ayuda. El uso de tokens de usuarios inactivos está prohibido. Gracias por tu comprensión y cooperación.`)

    return checkIs

}