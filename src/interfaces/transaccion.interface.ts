import { ObjectId } from "mongoose"
import { Atencion, Estado } from "./enums"

export interface Categoria {
    name: string
    sucursal: ObjectId
    etiquetas: [string]
}

export interface Item {
    name: string
    sucursal: ObjectId
    descripcion: string
    categoria: string
    subcategoria: string
    precio: number
}

export interface ProductosOrden extends Item {
    cantidad: number
    pendiente: number
    nota: string
    importe: number
}

export interface Orden {
    cliente: ObjectId,
    empleado: ObjectId,
    estado: Estado,
    tipo: Atencion,
    pedido: [ProductosOrden]
    total: number
    factura: boolean
}

export interface Menu {
    sucursal: ObjectId
    items: [Item]
}

export type pedidosOrden = Pick<Orden, 'pedido'>
export type regOrden = Pick<ProductosOrden, 'name' | 'cantidad' | 'nota'>
export type costOrden = Pick<ProductosOrden, 'name' | 'cantidad' | 'importe'>