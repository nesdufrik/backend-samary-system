import { model, Schema, Types } from 'mongoose'
import { Empresa, Sucursal } from '../interfaces/empresa.interface'

const EmpresaSchema = new Schema<Empresa>(
	{
		name: { type: String, required: true },
		propietario: { type: Types.ObjectId, ref: 'empleados', required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const SucursalSchema = new Schema<Sucursal>(
	{
		name: { type: String, required: true },
		empresa: { type: Types.ObjectId, ref: 'empresas', required: true },
		direccion: String,
		telefono: String,
		arroba: String,
		metodosPago: [{ type: String, required: true }],
		mesas: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const EmpresaModel = model('empresas', EmpresaSchema)
const SucursalModel = model('sucursales', SucursalSchema)

export { EmpresaModel, SucursalModel }
