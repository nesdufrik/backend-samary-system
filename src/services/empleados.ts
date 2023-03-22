
import { ApiError } from './../class/ApiError';
import { encriptar } from './../utils/bcrypt.handle';
import { Empleado } from "../interfaces/usuario.interface"
import { EmpleadoModel } from "../models/usuario.model"

export const getAllEmpleados = async (id: string) => {
    const listEmpleados = await EmpleadoModel.find({ sucursales: { $in: [id] } }, { "createdAt": 0, "updatedAt": 0 })
    return listEmpleados
}

export const detailEmpleado = async (id: string) => {
    const detail = await EmpleadoModel.findOne({ _id: id }, { "createdAt": 0, "updatedAt": 0 })
    return detail
}

export const createEmpleado = async (data: Empleado, id: string) => {

    const checkIs = await EmpleadoModel.findOne({ email: data.email })
    if (checkIs) throw new ApiError(403, `El correo ya esta registrado en esta Sucursal`)

    const passHash = await encriptar(data.password)

    const crear = await EmpleadoModel.create({
        email: data.email,
        password: passHash,
        fullName: data.fullName,
        rol: data.rol,
        cargo: data.cargo,
        sucursales: id
    })

    return crear
}