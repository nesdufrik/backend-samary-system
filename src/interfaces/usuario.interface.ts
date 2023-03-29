import { ObjectId } from 'mongoose';
import { Roles } from "./enums"

export interface Usuario {
    _id: ObjectId
    email: string
    password: string
    fullName: string
    avatar: string
}

export interface Empleado extends Usuario {
    rol: Roles
    cargo: string
    sucursal: ObjectId
}

export interface Cliente {
    name: string
    nit: number
    telf: string
    email: string
    tipo: string
    nota: string
}

export type LoginAuthType = Pick<Empleado, 'email' | 'password'>
export type UsuarioUpdate = Pick<Usuario, 'fullName' | 'password' | 'avatar'>
export type EmpleadoReg = Pick<Empleado, 'email' | 'password' | 'fullName' | 'avatar' | 'cargo'>
export type EmpleadoUpdate = Pick<Empleado, 'fullName' | 'password' | 'avatar' | 'cargo'>