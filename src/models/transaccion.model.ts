import { model, Schema, Types, Document, PaginateModel } from 'mongoose'
import { Atencion, Estado } from '../interfaces/enums'
import {
	Caja,
	Categoria,
	Item,
	Orden,
	ProductosOrden,
} from '../interfaces/transaccion.interface'
import paginate from 'mongoose-paginate-v2'

const CategoriaSchema = new Schema<Categoria>(
	{
		name: { type: String, required: true },
		sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
		etiquetas: [{ type: String }],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const ItemSchema = new Schema<Item>(
	{
		name: { type: String, required: true },
		sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
		descripcion: { type: String },
		categoria: { type: String, required: true },
		etiqueta: { type: String, required: true },
		precio: { type: Number, required: true },
		image: { type: String, required: false },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const CajaSchema = new Schema<Caja>(
	{
		sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
		active: { type: Boolean, required: true },
		total: { type: Number, required: false },
		reporte: [{ type: Object, required: false }],
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const OrdenSchema = new Schema<Orden>(
	{
		caja: { type: Types.ObjectId, ref: 'cajas', required: true },
		sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
		cliente: { type: Object },
		empleado: { type: Types.ObjectId, ref: 'empleados', required: true },
		estado: {
			type: String,
			required: true,
			default: Estado.Pending,
			enum: Object.values(Estado),
		},
		tipo: {
			type: String,
			required: true,
			default: Atencion.Local,
			enum: Object.values(Atencion),
		},
		mesa: { type: String },
		pedido: [{ type: Object, required: true }],
		desc: { type: Number },
		propina: { type: Number },
		subtotal: { type: Number },
		total: { type: Number, required: true },
		factura: { type: Boolean, required: true, default: true },
		payMetodo: { type: String },
		moneyClient: { type: Number },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

const PedidoSchema = new Schema<ProductosOrden>(
	{
		name: { type: String, required: true },
		cantidad: { type: Number, required: true },
		pendiente: { type: Number, required: true },
		nota: String,
		precio: { type: Number, required: true },
		importe: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
)

ItemSchema.plugin(paginate)

interface ItemDocument extends Document, Item {}

const CategoriaModel = model('categorias', CategoriaSchema)
const ItemModel = model<ItemDocument, PaginateModel<ItemDocument>>(
	'items',
	ItemSchema
)
const CajaModel = model('cajas', CajaSchema)
const OrdenModel = model('ordenes', OrdenSchema)
const PedidoModel = model('pedidos', PedidoSchema)

export { CategoriaModel, ItemModel, CajaModel, OrdenModel, PedidoModel }
