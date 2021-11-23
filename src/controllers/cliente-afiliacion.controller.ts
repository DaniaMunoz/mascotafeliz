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
  Cliente,
  Afiliacion,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAfiliacionController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Afiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Afiliacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Afiliacion>,
  ): Promise<Afiliacion[]> {
    return this.clienteRepository.afiliaciones(id).find(filter);
  }

  @post('/clientes/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Afiliacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.clienteId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {
            title: 'NewAfiliacionInCliente',
            exclude: ['afiliacionId'],
            optional: ['clienteId']
          }),
        },
      },
    }) afiliacion: Omit<Afiliacion, 'afiliacionId'>,
  ): Promise<Afiliacion> {
    return this.clienteRepository.afiliaciones(id).create(afiliacion);
  }

  @patch('/clientes/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Cliente.Afiliacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {partial: true}),
        },
      },
    })
    afiliacion: Partial<Afiliacion>,
    @param.query.object('where', getWhereSchemaFor(Afiliacion)) where?: Where<Afiliacion>,
  ): Promise<Count> {
    return this.clienteRepository.afiliaciones(id).patch(afiliacion, where);
  }

  @del('/clientes/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Cliente.Afiliacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Afiliacion)) where?: Where<Afiliacion>,
  ): Promise<Count> {
    return this.clienteRepository.afiliaciones(id).delete(where);
  }
}
