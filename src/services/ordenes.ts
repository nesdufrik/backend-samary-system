import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'
import { Orden } from './../interfaces/transaccion.interface'
import { OrdenModel } from '../models/transaccion.model'
import { EmpleadoModel } from '../models/usuario.model'
import { ApiError } from '../class/ApiError'

export const listarOrdenes = async (sucursalId: string) => {
    const listOrders = await OrdenModel.find({ sucursal: sucursalId })
    return listOrders
}

export const ordenesPorTotal = async (
    sucursalId: string,
    desde: string,
    hasta: string
) => {
    const orderByTotal = await OrdenModel.find(
        {
            sucursal: sucursalId,
            createdAt: { $gte: new Date(desde), $lte: new Date(hasta) },
        },
        { createdAt: 1, total: 1 }
    )
    return orderByTotal
}

export const ordenesPorItem = async (
    sucursalId: string,
    desde: string,
    hasta: string
) => {
    const filter = {
        sucursal: new Types.ObjectId(sucursalId),
        createdAt: {
            $gte: new Date(desde),
            $lte: new Date(hasta),
        },
    }
    const orderByItem = await OrdenModel.aggregate([
        {
            $match: {
                sucursal: new Types.ObjectId(sucursalId),
                createdAt: { $gte: new Date(desde), $lte: new Date(hasta) },
            },
        },
        {
            $unwind: '$pedido',
        },
        {
            $replaceRoot: { newRoot: '$pedido' },
        },
        {
            $project: {
                name: 1,
                cantidad: 1,
            },
        },
    ])

    return orderByItem
}

export const agregarOrden = async (data: Orden, session: JwtPayload) => {
    const { cliente, mesa, pedido, total } = data

    const employeeCheck = await EmpleadoModel.findOne({ _id: session.id })

    const createOrden = await OrdenModel.create({
        sucursal: employeeCheck?.sucursal,
        cliente,
        empleado: session.id,
        mesa,
        pedido,
        total,
    })

    return createOrden
}

export const actualizarOrden = async (ordenId: string, data: Orden) => {
    const { cliente, mesa, pedido, total } = data
    const updateOrder = await OrdenModel.findOneAndUpdate(
        { _id: ordenId },
        data,
        { new: true }
    )
    return updateOrder
}

export const getOrdenesSucursal = async (session: JwtPayload) => {
    const employeeCheck = await EmpleadoModel.findOne({ _id: session.id })
    // const listOrders = await OrdenModel.find({
    //     sucursal: employeeCheck?.sucursal,
    // })
    const listOrders = new Promise((resolve, reject) => {
        OrdenModel.find({ sucursal: employeeCheck?.sucursal })
            .populate('empleado', 'fullName avatar -_id')
            .exec((err, data) => {
                if (err) throw new ApiError(500, 'Ocurrio un error interno')
                resolve(data)
            })
    })
    return listOrders
}

export const deleteOrden = async (id: string) => {
    const checkIs = await OrdenModel.findOne({ _id: id })

    if (checkIs?.estado !== 'pendiente')
        throw new ApiError(
            403,
            'No se puede eliminar una orden que ya esta siendo atendida'
        )
    const borrar = await OrdenModel.deleteOne({ _id: id })
    return borrar
}
