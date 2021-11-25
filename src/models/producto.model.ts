import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {PedidoProducto} from './pedido-producto.model';
import {Proveedor} from './proveedor.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  productoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => PedidoProducto)
  pedidoProductos: PedidoProducto[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
