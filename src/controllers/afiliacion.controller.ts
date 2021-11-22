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
import {Afiliacion} from '../models';
import {AfiliacionRepository} from '../repositories';

export class AfiliacionController {
  constructor(
    @repository(AfiliacionRepository)
    public afiliacionRepository : AfiliacionRepository,
  ) {}

  @post('/afiliaciones')
  @response(200, {
    description: 'Afiliacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Afiliacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {
            title: 'NewAfiliacion',
            exclude: ['afiliacionId'],
          }),
        },
      },
    })
    afiliacion: Omit<Afiliacion, 'afiliacionId'>,
  ): Promise<Afiliacion> {
    return this.afiliacionRepository.create(afiliacion);
  }

  @get('/afiliaciones/count')
  @response(200, {
    description: 'Afiliacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Afiliacion) where?: Where<Afiliacion>,
  ): Promise<Count> {
    return this.afiliacionRepository.count(where);
  }

  @get('/afiliaciones')
  @response(200, {
    description: 'Array of Afiliacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Afiliacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Afiliacion) filter?: Filter<Afiliacion>,
  ): Promise<Afiliacion[]> {
    return this.afiliacionRepository.find(filter);
  }

  @patch('/afiliaciones')
  @response(200, {
    description: 'Afiliacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {partial: true}),
        },
      },
    })
    afiliacion: Afiliacion,
    @param.where(Afiliacion) where?: Where<Afiliacion>,
  ): Promise<Count> {
    return this.afiliacionRepository.updateAll(afiliacion, where);
  }

  @get('/afiliaciones/{id}')
  @response(200, {
    description: 'Afiliacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Afiliacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Afiliacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Afiliacion>
  ): Promise<Afiliacion> {
    return this.afiliacionRepository.findById(id, filter);
  }

  @patch('/afiliaciones/{id}')
  @response(204, {
    description: 'Afiliacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {partial: true}),
        },
      },
    })
    afiliacion: Afiliacion,
  ): Promise<void> {
    await this.afiliacionRepository.updateById(id, afiliacion);
  }

  @put('/afiliaciones/{id}')
  @response(204, {
    description: 'Afiliacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() afiliacion: Afiliacion,
  ): Promise<void> {
    await this.afiliacionRepository.replaceById(id, afiliacion);
  }

  @del('/afiliaciones/{id}')
  @response(204, {
    description: 'Afiliacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.afiliacionRepository.deleteById(id);
  }
}
