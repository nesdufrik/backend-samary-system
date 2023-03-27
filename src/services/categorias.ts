import { Categoria } from "../interfaces/transaccion.interface"
import { CategoriaModel } from "../models/transaccion.model"
import { EmpleadoModel } from "../models/usuario.model"

export const getAllCategorias = async (id: string) => {
    const listCategorias = await CategoriaModel.find({ sucursal: id }, { "createdAt": 0, "updatedAt": 0, "sucursal": 0 })
    return listCategorias
}

export const detailCategoria = async (id: string) => {
    const detail = await CategoriaModel.findOne({ _id: id }, { "createdAt": 0, "updatedAt": 0 })
    return detail
}

export const createCategoria = async (data: Categoria, id: string) => {
    const createCategoria = await CategoriaModel.create({
        name: data.name,
        sucursal: id,
        etiquetas: data.etiquetas,
    })

    return createCategoria
}

export const updateCategoria = async (data: Categoria, id: string) => {
    const actualizar = await CategoriaModel.findOneAndUpdate({ _id: id }, data, { new: true })
    return actualizar
}

export const deleteCategoria = async (id: string) => {
    const eliminar = await CategoriaModel.deleteOne({ _id: id })
    return eliminar
}

// Servicios para POS Employee

export const posGetAllCategorias = async (id: string) => {
    const sucursalId = await EmpleadoModel.findOne({ _id: id })
    const listCategorias = await CategoriaModel.find({ sucursal: sucursalId?.sucursal }, { "createdAt": 0, "updatedAt": 0, "sucursal": 0 })
    return listCategorias
}