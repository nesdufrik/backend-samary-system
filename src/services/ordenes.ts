import { Types } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'
import { Orden } from './../interfaces/transaccion.interface'
import { OrdenModel } from '../models/transaccion.model'
import { ClienteModel, EmpleadoModel } from '../models/usuario.model'
import { ApiError } from '../class/ApiError'
import { Estado } from '../interfaces/enums'
//Analiticas
export const listarOrdenes = async (sucursalId: string) => {
	const listOrders = await OrdenModel.find({ sucursal: sucursalId })
	return listOrders
}

//Analiticas
export const ordenesPorTotal = async (
	sucursalId: string,
	desde: string,
	hasta: string
) => {
	const orderByTotal = await OrdenModel.find(
		{
			sucursal: sucursalId,
			estado: 'terminado',
			createdAt: { $gte: new Date(desde), $lte: new Date(hasta) },
		},
		{ createdAt: 1, total: 1 }
	)
	return orderByTotal
}

//Analiticas
export const ordenesPorItem = async (
	sucursalId: string,
	desde: string,
	hasta: string
) => {
	const orderByItem = await OrdenModel.aggregate([
		{
			$match: {
				sucursal: new Types.ObjectId(sucursalId),
				estado: 'terminado',
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

//Employee
export const agregarOrden = async (
	data: Orden,
	session: JwtPayload,
	caja: string
) => {
	const { cliente, mesa, pedido, total } = data
	const employeeCheck = await EmpleadoModel.findOne({ _id: session.id })

	const createOrden = await OrdenModel.create({
		caja: caja,
		sucursal: employeeCheck?.sucursal,
		cliente,
		empleado: session.id,
		mesa,
		pedido,
		total,
	})

	return createOrden
}

//Employee
export const actualizarOrden = async (ordenId: string, data: Orden) => {
	await OrdenModel.findOneAndUpdate({ _id: ordenId }, data, { new: true })
	const updatedOrder = new Promise((resolve, reject) => {
		OrdenModel.findOne({ _id: ordenId })
			.populate('empleado', 'fullName avatar -_id')
			.exec((err, data) => {
				if (err) throw new ApiError(500, 'Ocurrio un error interno')
				resolve(data)
			})
	})
	return updatedOrder
}

// Employee
export const traerOrden = async (ordenId: string) => {
	return await OrdenModel.findOne({ _id: ordenId })
}

//Employee
export const getOrdenesSucursal = async (session: JwtPayload, caja: string) => {
	const box = caja === 'undefined' ? '63ec175ab8f10d4eb8b54e65' : caja
	const employeeCheck = await EmpleadoModel.findOne({ _id: session.id })
	const listOrders = await OrdenModel.find({
		sucursal: employeeCheck?.sucursal,
		caja: box,
	})
		.populate('empleado', 'fullName avatar -_id')
		.exec()

	return listOrders
}

export const getOrdenesTerminadas = async (
	session: JwtPayload,
	caja: string
) => {
	const box = caja === 'undefined' ? '63ec175ab8f10d4eb8b54e65' : caja
	const employeeCheck = await EmpleadoModel.findOne({ _id: session.id })
	const listOrders = new Promise((resolve, reject) => {
		OrdenModel.find({
			sucursal: employeeCheck?.sucursal,
			caja: box,
			estado: 'terminado',
		})
			.populate('empleado', 'fullName avatar -_id')
			.exec((err, data) => {
				if (err) throw new ApiError(500, 'Ocurrio un error interno')
				resolve(data)
			})
	})
	return listOrders
}

export const getOrdenesCaja = async (caja: string) => {
	const box = caja === 'undefined' ? '63ec175ab8f10d4eb8b54e65' : caja
	const listOrders = new Promise((resolve, reject) => {
		OrdenModel.find({
			caja: box,
			estado: 'terminado',
		})
			.populate('empleado', 'fullName avatar -_id')
			.exec((err, data) => {
				if (err) throw new ApiError(500, 'Ocurrio un error interno')
				resolve(data)
			})
	})
	return listOrders
}

//Employee
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

export const pagarOrden = async (ordenId: string, data: Orden) => {
	// Registrar datos de Cliente
	const clientCheck = await ClienteModel.findOne({ nit: data.cliente.nit })
	if (!clientCheck) {
		await ClienteModel.create(data.cliente)
	}

	// Actualizar datos de orden y finalizar

	const payload = data
	payload.estado = Estado.Terminated

	await OrdenModel.findOneAndUpdate({ _id: ordenId }, payload, { new: true })
	const updatedOrder = new Promise((resolve, reject) => {
		OrdenModel.findOne({ _id: ordenId })
			.populate('empleado', 'fullName avatar -_id')
			.exec((err, data) => {
				if (err) throw new ApiError(500, 'Ocurrio un error interno')
				resolve(data)
			})
	})
	return updatedOrder
}
