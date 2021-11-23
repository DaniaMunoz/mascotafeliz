import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  PedidoProducto,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPedidoProductoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many PedidoProducto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoProducto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoProducto>,
  ): Promise<PedidoProducto[]> {
    return this.pedidoRepository.pedidoProductos(id).find(filter);
  }

  @post('/pedidos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.pedidoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {
            title: 'NewPedidoProductoInPedido',
            exclude: ['pedidoProductoId'],
            optional: ['pedidoId']
          }),
        },
      },
    }) pedidoProducto: Omit<PedidoProducto, 'pedidoProductoId'>,
  ): Promise<PedidoProducto> {
    return this.pedidoRepository.pedidoProductos(id).create(pedidoProducto);
  }

  @patch('/pedidos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Pedido.PedidoProducto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {partial: true}),
        },
      },
    })
    pedidoProducto: Partial<PedidoProducto>,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.pedidoRepository.pedidoProductos(id).patch(pedidoProducto, where);
  }

  @del('/pedidos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Pedido.PedidoProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.pedidoRepository.pedidoProductos(id).delete(where);
  }
}
