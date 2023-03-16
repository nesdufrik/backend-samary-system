import { Categoria } from "../interfaces/transaccion.interface"
import { CategoriaModel } from "../models/transaccion.model"

export const getAllCategorias = async (id: string) => {
    const listCategorias = await CategoriaModel.find({ sucursal: id }, { "createdAt": 0, "updatedAt": 0, "sucursal": 0 })
    return listCategorias
}

export const detailCategoria = async (id: string) => {
    const detail = await CategoriaModel.find({ _id: id }, { "createdAt": 0, "updatedAt": 0 })
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

export const updateCategoria = async (data: Categoria) => {

}