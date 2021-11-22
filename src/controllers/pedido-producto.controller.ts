import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PedidoProducto} from '../models';
import {PedidoProductoRepository} from '../repositories';

export class PedidoProductoController {
  constructor(
    @repository(PedidoProductoRepository)
    public pedidoProductoRepository : PedidoProductoRepository,
  ) {}

  @post('/pedido-productos')
  @response(200, {
    description: 'PedidoProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(PedidoProducto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {
            title: 'NewPedidoProducto',
            exclude: ['pedidoProductoId'],
          }),
        },
      },
    })
    pedidoProducto: Omit<PedidoProducto, 'pedidoProductoId'>,
  ): Promise<PedidoProducto> {
    return this.pedidoProductoRepository.create(pedidoProducto);
  }

  @get('/pedido-productos/count')
  @response(200, {
    description: 'PedidoProducto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PedidoProducto) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.pedidoProductoRepository.count(where);
  }

  @get('/pedido-productos')
  @response(200, {
    description: 'Array of PedidoProducto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PedidoProducto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PedidoProducto) filter?: Filter<PedidoProducto>,
  ): Promise<PedidoProducto[]> {
    return this.pedidoProductoRepository.find(filter);
  }

  @patch('/pedido-productos')
  @response(200, {
    description: 'PedidoProducto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {partial: true}),
        },
      },
    })
    pedidoProducto: PedidoProducto,
    @param.where(PedidoProducto) where?: Where<PedidoProducto>,
  ): Promise<Count> {
    return this.pedidoProductoRepository.updateAll(pedidoProducto, where);
  }

  @get('/pedido-productos/{id}')
  @response(200, {
    description: 'PedidoProducto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PedidoProducto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PedidoProducto, {exclude: 'where'}) filter?: FilterExcludingWhere<PedidoProducto>
  ): Promise<PedidoProducto> {
    return this.pedidoProductoRepository.findById(id, filter);
  }

  @patch('/pedido-productos/{id}')
  @response(204, {
    description: 'PedidoProducto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoProducto, {partial: true}),
        },
      },
    })
    pedidoProducto: PedidoProducto,
  ): Promise<void> {
    await this.pedidoProductoRepository.updateById(id, pedidoProducto);
  }

  @put('/pedido-productos/{id}')
  @response(204, {
    description: 'PedidoProducto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedidoProducto: PedidoProducto,
  ): Promise<void> {
    await this.pedidoProductoRepository.replaceById(id, pedidoProducto);
  }

  @del('/pedido-productos/{id}')
  @response(204, {
    description: 'PedidoProducto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pedidoProductoRepository.deleteById(id);
  }
}
