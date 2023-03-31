import { Types } from 'mongoose';
import { agregarCliente } from './clientes'
import { JwtPayload } from 'jsonwebtoken'
import { Orden } from './../interfaces/transaccion.interface'
import { OrdenModel } from '../models/transaccion.model'
import { ClienteModel } from '../models/usuario.model'

export const listarOrdenes = async (sucursalId: string) => {
    const listOrders = await OrdenModel.find({ sucursal: sucursalId })
    return listOrders
}

export const ordenesPorTotal = async (sucursalId: string) => {
    const orderByTotal = await OrdenModel.find(
        { sucursal: sucursalId },
        { createdAt: 1, total: 1 }
    )
    return orderByTotal
}

export const ordenesPorItem = async (sucursalId: string) => {
    const orderByItem = await OrdenModel.aggregate([
        {
            $match: { sucursal: new Types.ObjectId(sucursalId) }
        },
        {
            $unwind: "$pedido"
        },
        {
            $replaceRoot: { newRoot: "$pedido" }
        },
        {
            $project: {
                name: 1,
                cantidad: 1
            }
        }
    ])
    return orderByItem
}

export const agregarOrden = async (
    sucursalId: string,
    data: Orden,
    session: JwtPayload
) => {
    const { cliente, mesa, pedido, total } = data

    const clientCheck = await ClienteModel.findOne({ nit: cliente.nit })
    if (!clientCheck) {
        await agregarCliente(cliente)
    }

    const createOrden = await OrdenModel.create({
        sucursal: sucursalId,
        cliente,
        empleado: session.id,
        mesa,
        pedido,
        total,
    })

    return createOrden
}
