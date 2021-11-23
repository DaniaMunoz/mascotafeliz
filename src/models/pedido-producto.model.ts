import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
  })
  pedidoId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;
  //Cambiamos relaciones a hasmany
  /* @belongsTo(() => Producto)
  productoId: string;

  @belongsTo(() => Pedido)
  pedidoId: string; */

  constructor(data?: Partial<PedidoProducto>) {
    super(data);
  }
}

export interface PedidoProductoRelations {
  // describe navigational properties here
}

export type PedidoProductoWithRelations = PedidoProducto & PedidoProductoRelations;
