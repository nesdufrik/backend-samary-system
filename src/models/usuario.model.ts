import { model, Schema, Types } from "mongoose";
import { Roles } from "../interfaces/enums";
import { Cliente, Empleado, Usuario } from "../interfaces/usuario.interface";

const UsuarioSchema = new Schema<Usuario>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        avatar: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const EmpleadoSchema = new Schema<Empleado>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        avatar: { type: String, required: true },
        rol: { type: String, required: true, enum: Object.values(Roles) },
        cargo: { type: String, required: true },
        sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ClienteSchema = new Schema<Cliente>(
    {
        name: String,
        nit: Number,
        telf: String,
        email: String,
        tipo: String,
        nota: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const UsuarioModel = model('usuarios', UsuarioSchema)
const EmpleadoModel = model('empleados', EmpleadoSchema)
const ClienteModel = model('clientes', ClienteSchema)

export { UsuarioModel, EmpleadoModel, ClienteModel }