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
import {Proveedor} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorController {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository : ProveedorRepository,
  ) {}

  @post('/proveedores')
  @response(200, {
    description: 'Proveedor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedor',
            exclude: ['proveedorId'],
          }),
        },
      },
    })
    proveedor: Omit<Proveedor, 'proveedorId'>,
  ): Promise<Proveedor> {
    return this.proveedorRepository.create(proveedor);
  }

  @get('/proveedores/count')
  @response(200, {
    description: 'Proveedor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.count(where);
  }

  @get('/proveedores')
  @response(200, {
    description: 'Array of Proveedor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Proveedor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Proveedor) filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.proveedorRepository.find(filter);
  }

  @patch('/proveedores')
  @response(200, {
    description: 'Proveedor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.updateAll(proveedor, where);
  }

  @get('/proveedores/{id}')
  @response(200, {
    description: 'Proveedor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Proveedor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Proveedor, {exclude: 'where'}) filter?: FilterExcludingWhere<Proveedor>
  ): Promise<Proveedor> {
    return this.proveedorRepository.findById(id, filter);
  }

  @patch('/proveedores/{id}')
  @response(204, {
    description: 'Proveedor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.updateById(id, proveedor);
  }

  @put('/proveedores/{id}')
  @response(204, {
    description: 'Proveedor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.replaceById(id, proveedor);
  }

  @del('/proveedores/{id}')
  @response(204, {
    description: 'Proveedor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proveedorRepository.deleteById(id);
  }
}
