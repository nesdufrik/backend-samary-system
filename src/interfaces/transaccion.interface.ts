import { Cliente } from './usuario.interface'
import { ObjectId } from 'mongoose'
import { Atencion, Estado } from './enums'

export interface Caja {
    sucursal: ObjectId
    active: boolean
}

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
    etiqueta: string
    precio: number
}

export interface ProductosOrden extends Item {
    cantidad: number
    pendiente: number
    nota: string
    importe: number
}

export interface Orden {
    caja: ObjectId
    sucursal: ObjectId
    cliente: Cliente
    empleado: ObjectId
    estado: Estado
    tipo: Atencion
    mesa: string
    pedido: [PedidosOrden]
    total: number
    factura: boolean
    payMetodo: string
    moneyClient: number
}

export interface Menu {
    sucursal: ObjectId
    items: [Item]
}

export type PedidosOrden = Pick<
    ProductosOrden,
    'name' | 'precio' | 'cantidad' | 'pendiente' | 'nota' | 'importe'
>
