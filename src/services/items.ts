import { Item } from '../interfaces/transaccion.interface'
import { ItemModel } from '../models/transaccion.model'
import { EmpleadoModel } from '../models/usuario.model'

export const getAllItems = async (id: string) => {
    const listItems = await ItemModel.find(
        { sucursal: id },
        { createdAt: 0, updatedAt: 0, descripcion: 0, sucursal: 0 }
    )
    return listItems
}

export const detailItem = async (id: string) => {
    const detail = await ItemModel.findOne(
        { _id: id },
        { createdAt: 0, updatedAt: 0, descripcion: 0, sucursal: 0 }
    )
    return detail
}

export const createItem = async (data: Item, id: string) => {
    const createItem = await ItemModel.create({
        name: data.name,
        sucursal: id,
        categoria: data.categoria,
        etiqueta: data.etiqueta,
        precio: data.precio,
        image: data.image,
    })

    return createItem
}

export const updateItem = async (data: Item, id: string) => {
    const actualizar = await ItemModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
    return actualizar
}

export const deleteItem = async (id: string) => {
    const eliminar = await ItemModel.deleteOne({ _id: id })
    return eliminar
}

// Servicios para POS Employee

export const posGetAllItems = async (id: string) => {
    const sucursalId = await EmpleadoModel.findOne({ _id: id })
    const listItems = await ItemModel.find(
        { sucursal: sucursalId?.sucursal },
        { createdAt: 0, updatedAt: 0, descripcion: 0, sucursal: 0 }
    )
    return listItems
}
