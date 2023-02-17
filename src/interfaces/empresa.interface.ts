import { ObjectId } from "mongoose"

export interface Empresa {
    name: string
    propietario: ObjectId
}

export interface Sucursal {
    name: string
    empresa: ObjectId
    direccion: string
    telefono: string
}
