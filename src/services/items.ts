import { deleteFile, getFileStream, getUrlCdn, uploadFile } from '../config/s3'
import { Item } from '../interfaces/transaccion.interface'
import { ItemModel } from '../models/transaccion.model'
import { EmpleadoModel } from '../models/usuario.model'
import { randomImageName } from '../utils/random.handle'
import { ApiError } from '../class/ApiError'
import sharp from 'sharp'

export const getAllItems = async (id: string) => {
    const listItems = await ItemModel.find(
        { sucursal: id },
        { createdAt: 0, updatedAt: 0, descripcion: 0, sucursal: 0 }
    ).sort({ categoria: 1, etiqueta: 1, name: 1 })

    for (const item of listItems) {
        if (item.image) {
            item.image = getUrlCdn(item.image)
        }
    }

    return listItems
}

export const detailItem = async (id: string) => {
    const detail = await ItemModel.findOne(
        { _id: id },
        { createdAt: 0, updatedAt: 0, descripcion: 0, sucursal: 0 }
    )
    return detail
}

export const createItem = async (data: Item, file: any, id: string) => {
    let dataItem = {}

    if (file) {
        //image random name
        const imageName = randomImageName()
        //resize image
        const buffer = await sharp(file.buffer)
            .resize({ width: 1920, height: 1080, fit: 'inside' })
            .toBuffer()
        const fileUpload = {
            buffer,
            filename: imageName,
            mimetype: file.mimetype,
        }
        await uploadFile(fileUpload)
        dataItem = {
            name: data.name,
            sucursal: id,
            categoria: data.categoria,
            etiqueta: data.etiqueta,
            precio: data.precio,
            image: imageName,
        }
    } else {
        dataItem = {
            name: data.name,
            sucursal: id,
            categoria: data.categoria,
            etiqueta: data.etiqueta,
            precio: data.precio,
        }
    }

    const createItem = await ItemModel.create(dataItem)

    if (createItem.image) {
        createItem.image = getUrlCdn(createItem.image)
    }

    return createItem
}

export const updateItem = async (data: Item, file: any, id: string) => {
    const checkIs = await ItemModel.findOne({ _id: id })

    if (!checkIs) throw new ApiError(404, 'Producto no encontrado')

    if (file) {
        //resize image
        const buffer = await sharp(file.buffer)
            .resize({ width: 1920, height: 1080, fit: 'inside' })
            .toBuffer()

        //random name
        const imageName = randomImageName()

        if (checkIs.image) {
            await deleteFile(checkIs.image)
            const fileUpload = {
                buffer,
                filename: imageName,
                mimetype: file.mimetype,
            }
            await uploadFile(fileUpload)
            data.image = imageName
        }

        if (!checkIs.image) {
            const fileUpload = {
                buffer,
                filename: imageName,
                mimetype: file.mimetype,
            }
            await uploadFile(fileUpload)
            data.image = imageName
        }
    }

    if (!file) {
        if (checkIs.image) {
            data.image = checkIs.image
        }
    }

    const actualizar = await ItemModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })

    if (actualizar?.image) {
        actualizar.image = getUrlCdn(actualizar.image)
    }

    return actualizar
}

export const deleteItem = async (id: string) => {
    const checkIs = await ItemModel.findOne({ _id: id })
    if (!checkIs) throw new ApiError(404, 'Producto no encontrado')
    if (checkIs.image) await deleteFile(checkIs.image)
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

    for (const item of listItems) {
        if (item.image) {
            item.image = getUrlCdn(item.image)
        }
    }
    return listItems
}
