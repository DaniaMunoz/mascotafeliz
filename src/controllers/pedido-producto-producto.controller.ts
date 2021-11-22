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
  Producto,
} from '../models';
import {PedidoProductoRepository} from '../repositories';

export class PedidoProductoProductoController {
  constructor(
    @repository(PedidoProductoRepository)
    public pedidoProductoRepository: PedidoProductoRepository,
  ) { }

  @get('/pedido-productos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to PedidoProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof PedidoProducto.prototype.pedidoProductoId,
  ): Promise<Producto> {
    return this.pedidoProductoRepository.producto(id);
  }
}
