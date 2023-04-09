import { check } from 'express-validator'
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
