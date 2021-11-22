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
import {PagoPlan} from '../models';
import {PagoPlanRepository} from '../repositories';

export class PagoPlanController {
  constructor(
    @repository(PagoPlanRepository)
    public pagoPlanRepository : PagoPlanRepository,
  ) {}

  @post('/pagoplanes')
  @response(200, {
    description: 'PagoPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(PagoPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlan, {
            title: 'NewPagoPlan',
            exclude: ['pagoPlanId'],
          }),
        },
      },
    })
    pagoPlan: Omit<PagoPlan, 'pagoPlanId'>,
  ): Promise<PagoPlan> {
    return this.pagoPlanRepository.create(pagoPlan);
  }

  @get('/pagoplanes/count')
  @response(200, {
    description: 'PagoPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PagoPlan) where?: Where<PagoPlan>,
  ): Promise<Count> {
    return this.pagoPlanRepository.count(where);
  }

  @get('/pagoplanes')
  @response(200, {
    description: 'Array of PagoPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PagoPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PagoPlan) filter?: Filter<PagoPlan>,
  ): Promise<PagoPlan[]> {
    return this.pagoPlanRepository.find(filter);
  }

  @patch('/pagoplanes')
  @response(200, {
    description: 'PagoPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlan, {partial: true}),
        },
      },
    })
    pagoPlan: PagoPlan,
    @param.where(PagoPlan) where?: Where<PagoPlan>,
  ): Promise<Count> {
    return this.pagoPlanRepository.updateAll(pagoPlan, where);
  }

  @get('/pagoplanes/{id}')
  @response(200, {
    description: 'PagoPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PagoPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PagoPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<PagoPlan>
  ): Promise<PagoPlan> {
    return this.pagoPlanRepository.findById(id, filter);
  }

  @patch('/pagoplanes/{id}')
  @response(204, {
    description: 'PagoPlan PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlan, {partial: true}),
        },
      },
    })
    pagoPlan: PagoPlan,
  ): Promise<void> {
    await this.pagoPlanRepository.updateById(id, pagoPlan);
  }

  @put('/pagoplanes/{id}')
  @response(204, {
    description: 'PagoPlan PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagoPlan: PagoPlan,
  ): Promise<void> {
    await this.pagoPlanRepository.replaceById(id, pagoPlan);
  }

  @del('/pagoplanes/{id}')
  @response(204, {
    description: 'PagoPlan DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagoPlanRepository.deleteById(id);
  }
}
