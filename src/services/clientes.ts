import { ApiError } from './../class/ApiError';
import { Cliente } from './../interfaces/usuario.interface';
import { ClienteModel } from "../models/usuario.model"

export const listarClientes = async () => {
    const allClients = await ClienteModel.find()
    return allClients
}

export const detalleCliente = async (nit: string) => {
    const detailClient = await ClienteModel.findOne({ nit }, { "_id": 0, "createdAt": 0, "updatedAt": 0 })
    return detailClient
}

export const agregarCliente = async (data: Cliente) => {
    const checkIs = await ClienteModel.findOne({ nit: data.nit })
    if (checkIs) throw new ApiError(403, `El nit ya existe`)
    const addClient = await ClienteModel.create(data)
    return addClient
}

export const actualizarCliente = async (nit: string, data: Cliente) => {
    const updateClient = await ClienteModel.findOneAndUpdate({ nit }, data, { new: true })
    return updateClient
}

export const borrarCliente = async (nit: string) => {
    const delClient = await ClienteModel.deleteOne({ nit })
    return delClient
}