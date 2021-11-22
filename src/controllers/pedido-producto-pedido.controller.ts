import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoProducto,
  Pedido,
} from '../models';
import {PedidoProductoRepository} from '../repositories';

export class PedidoProductoPedidoController {
  constructor(
    @repository(PedidoProductoRepository)
    public pedidoProductoRepository: PedidoProductoRepository,
  ) { }

  @get('/pedido-productos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to PedidoProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof PedidoProducto.prototype.pedidoProductoId,
  ): Promise<Pedido> {
    return this.pedidoProductoRepository.pedido(id);
  }
}
