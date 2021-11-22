import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {Pedido} from './pedido.model';

@model()
export class PedidoProducto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  pedidoProductoId?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  totalPago: number;

  @belongsTo(() => Producto)
  productoId: string;

  @belongsTo(() => Pedido)
  pedidoId: string;

  constructor(data?: Partial<PedidoProducto>) {
    super(data);
  }
}

export interface PedidoProductoRelations {
  // describe navigational properties here
}

export type PedidoProductoWithRelations = PedidoProducto & PedidoProductoRelations;
