import { ObjectId } from 'mongoose';
import { Roles } from "./enums"

export interface Usuario {
    _id: ObjectId
    email: string
    password: string
    fullName: string
}

export interface Empleado extends Usuario {
    rol: Roles
    cargo: string
    sucursales: [ObjectId]
}

export interface Cliente {
    name: string
    nit: number
    telf: string
    email: string
}

export type LoginAuthType = Pick<Empleado, 'email' | 'password'>
export type UsuarioUpdate = Pick<Usuario, 'fullName' | 'password'>
export type EmpleadoReg = Pick<Empleado, 'email' | 'password' | 'fullName' | 'rol'>