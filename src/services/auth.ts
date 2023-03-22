import { generarToken } from './../utils/jwt.handle';
import { ApiError } from "../class/ApiError";
import { LoginAuthType, Usuario, UsuarioUpdate } from "../interfaces/usuario.interface";
import { EmpleadoModel, UsuarioModel } from "../models/usuario.model";
import { encriptar, verificar } from "../utils/bcrypt.handle";
import { JwtPayload } from 'jsonwebtoken';

// export const loginAuth = async (data: LoginAuthType) => {
//     let path = ""
//     let checkIs = await UsuarioModel.findOne({ email: data.email })

//     if (!checkIs) { checkIs = await EmpleadoModel.findOne({ email: data.email }) } else { path = "admin" }
//     if (!checkIs) { throw new ApiError(401, `Por favor revisa tu usuario y contraseña. Los campos son sensibles a mayúsculas y minúsculas`) } else { path = "pos" }

//     let isCorrect = await verificar(data.password, checkIs.password)
//     if (!isCorrect) throw new ApiError(401, `Por favor revisa tu usuario y contraseña. Los campos son sensibles a mayúsculas y minúsculas`)

//     const payload = {
//         id: checkIs._id,
//         name: checkIs.fullName
//     }

//     const tokenSession = generarToken(payload)
//     const dataSession = {
//         name: checkIs.fullName,
//         token: tokenSession,
//         path: path
//     }

//     return dataSession
// }

export const loginAuth = async (data: LoginAuthType) => {
    let path = ""
    let checkIs = await UsuarioModel.findOne({ email: data.email })

    if (!checkIs) {
        checkIs = await EmpleadoModel.findOne({ email: data.email })
        if (!checkIs) {
            throw new ApiError(401, `Por favor revisa tu usuario y contraseña. Los campos son sensibles a mayúsculas y minúsculas`)
        }
        path = "pos"
    } else {
        path = "admin"
    }

    const isCorrect = await verificar(data.password, checkIs.password)
    if (!isCorrect) throw new ApiError(401, `Por favor revisa tu usuario y contraseña. Los campos son sensibles a mayúsculas y minúsculas`)

    const payload = {
        id: checkIs._id,
        name: checkIs.fullName
    }

    const tokenSession = generarToken(payload)
    const dataSession = {
        name: checkIs.fullName,
        token: tokenSession,
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

    const actualizar = UsuarioModel.findOneAndUpdate({ _id: session.id }, {
        fullName: data.fullName,
        password: data.password
    }, { new: true })
    return actualizar
}

export const deleteUser = async (session: JwtPayload) => {
    const checkIs = await UsuarioModel.findOne({ _id: session.id })
    if (!checkIs) throw new ApiError(404, `El usuario ya no existe`)

    const eliminar = UsuarioModel.deleteOne({ _id: session.id })
    return eliminar
}