import { JwtPayload } from 'jsonwebtoken'
import { Caja } from '../interfaces/transaccion.interface'
import { EmpleadoModel } from '../models/usuario.model'
import { CajaModel } from '../models/transaccion.model'

export const getCaja = async (session: JwtPayload) => {
    const check = await EmpleadoModel.findOne({ _id: session.id })
    const cajaActiva = await CajaModel.findOne({
        sucursal: check?.sucursal,
        active: true,
    })

    return cajaActiva
}

export const getAllCajas = async (session: JwtPayload) => {
    const check = await EmpleadoModel.findOne({ _id: session.id })
    const cajasSucursal = await CajaModel.find({
        sucursal: check?.sucursal,
    })

    return cajasSucursal
}

export const getCajasSucursal = async (id: string) => {
    const cajasSucursal = await CajaModel.find({
        sucursal: id,
        active: false,
    })

    return cajasSucursal
}

export const getCajasSucursalDates = async (
    id: string,
    desde: string,
    hasta: string
) => {
    const cajasSucursal = await CajaModel.find({
        sucursal: id,
        active: false,
        createdAt: { $gte: new Date(desde), $lte: new Date(hasta) },
    })

    return cajasSucursal
}

export const crearCaja = async (data: Caja, session: JwtPayload) => {
    const { active } = data
    const employeeCheck = await EmpleadoModel.findOne({ _id: session.id })
    const createCaja = await CajaModel.create({
        sucursal: employeeCheck?.sucursal,
        active,
    })

    return createCaja
}

export const actualizarCaja = async (cajaId: string, data: Caja) => {
    return await CajaModel.findOneAndUpdate({ _id: cajaId }, data, {
        new: true,
    })
}
