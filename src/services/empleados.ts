import { ApiError } from './../class/ApiError';
import { encriptar } from './../utils/bcrypt.handle';
import { EmpleadoReg, EmpleadoUpdate } from "../interfaces/usuario.interface"
import { EmpleadoModel } from "../models/usuario.model"

export const getAllEmpleados = async (id: string) => {
    const listEmpleados = await EmpleadoModel.find({ sucursal: id }, { "createdAt": 0, "updatedAt": 0, "rol": 0, "password": 0 })
    return listEmpleados
}

export const detailEmpleado = async (id: string) => {
    const detail = await EmpleadoModel.findOne({ _id: id }, { "createdAt": 0, "updatedAt": 0 })
    return detail
}

export const createEmpleado = async (data: EmpleadoReg, id: string) => {

    const checkIs = await EmpleadoModel.findOne({ email: data.email })
    if (checkIs) throw new ApiError(403, `El usuario ya esta registrado en esta Sucursal`)

    const passHash = await encriptar(data.password)

    const crear = await EmpleadoModel.create({
        email: data.email,
        password: passHash,
        fullName: data.fullName,
        avatar: data.avatar,
        rol: 'empleado1',
        cargo: data.cargo,
        sucursal: id
    })

    const { _id, email, fullName, avatar, cargo, sucursal } = crear
    return { _id, email, fullName, avatar, cargo, sucursal }
}

export const updateEmpleado = async (data: EmpleadoUpdate, id: string) => {
    const checkIs = await EmpleadoModel.findOne({ _id: id })
    if (!checkIs) throw new ApiError(404, `El usuario ya no existe`)

    !data.fullName ? data.fullName = checkIs.fullName : data.fullName = data.fullName
    !data.password ? data.password = checkIs.password : data.password = await encriptar(data.password)
    !data.avatar ? data.avatar = checkIs.avatar : data.avatar = data.avatar
    !data.cargo ? data.cargo = checkIs.cargo : data.cargo = data.cargo

    const updateData = {
        fullName: data.fullName,
        password: data.password,
        avatar: data.avatar,
        cargo: data.cargo
    }

    const actualizar = EmpleadoModel.findOneAndUpdate({ _id: id }, updateData, { new: true, projection: { createdAt: 0, updatedAt: 0, password: 0, rol: 0 } })
    return actualizar
}

export const deleteEmpleado = async (id: string) => {
    const eliminar = await EmpleadoModel.deleteOne({ _id: id })
    return eliminar
}