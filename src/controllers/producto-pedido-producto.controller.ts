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
  Producto,
  PedidoProducto,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoPedidoProductoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Array of Producto has many PedidoProducto',
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
    return this.productoRepository.pedidoProductos(id).find(filter);
  }

  @post('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoProducto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.productoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {
            title: 'NewPedidoProductoInProducto',
            exclude: ['pedidoProductoId'],
            optional: ['productoId']
          }),
        },
      },
    }) pedidoProducto: Omit<PedidoProducto, 'pedidoProductoId'>,
  ): Promise<PedidoProducto> {
    return this.productoRepository.pedidoProductos(id).create(pedidoProducto);
  }

  @patch('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Producto.PedidoProducto PATCH success count',
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
    return this.productoRepository.pedidoProductos(id).patch(pedidoProducto, where);
  }

  @del('/productos/{id}/pedido-productos', {
    responses: {
      '200': {
        description: 'Producto.PedidoProducto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoProducto)) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.productoRepository.pedidoProductos(id).delete(where);
  }
}
