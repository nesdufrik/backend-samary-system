import { model, Schema, Types } from "mongoose";
import { arrayBuffer } from "stream/consumers";
import { Atencion, Estado } from "../interfaces/enums";
import { Categoria, Item, Orden, ProductosOrden } from "../interfaces/transaccion.interface";

const CategoriaSchema = new Schema<Categoria>(
    {
        name: { type: String, required: true },
        sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
        etiquetas: [{ type: String }]
    },
    {
        timestamps: true,
        versionKey: false
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
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const OrdenSchema = new Schema<Orden>(
    {
        sucursal: { type: Types.ObjectId, ref: 'sucursales', required: true },
        cliente: { type: Object },
        empleado: { type: Types.ObjectId, ref: 'empleados', required: true },
        estado: {
            type: String,
            required: true,
            default: Estado.Pending,
            enum: Object.values(Estado)
        },
        tipo: {
            type: String,
            required: true,
            default: Atencion.Local,
            enum: Object.values(Atencion)
        },
        mesa: { type: String },
        pedido: [{ type: Object, required: true }],
        total: { type: Number, required: true },
        factura: { type: Boolean, required: true, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const PedidoSchema = new Schema<ProductosOrden>(
    {
        name: { type: String, required: true },
        cantidad: { type: Number, required: true },
        pendiente: { type: Number, required: true },
        nota: String,
        precio: { type: Number, required: true },
        importe: { type: Number, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)


const CategoriaModel = model('categorias', CategoriaSchema)
const ItemModel = model('items', ItemSchema)
const OrdenModel = model('ordenes', OrdenSchema)
const PedidoModel = model('pedidos', PedidoSchema)

export { CategoriaModel, ItemModel, OrdenModel, PedidoModel }