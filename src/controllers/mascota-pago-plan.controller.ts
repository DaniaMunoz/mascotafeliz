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
  Mascota,
  PagoPlan,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPagoPlanController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Array of Mascota has many PagoPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PagoPlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PagoPlan>,
  ): Promise<PagoPlan[]> {
    return this.mascotaRepository.pagoPlans(id).find(filter);
  }

  @post('/mascotas/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagoPlan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.mascotaId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlan, {
            title: 'NewPagoPlanInMascota',
            exclude: ['pagoPlanId'],
            optional: ['mascotaId']
          }),
        },
      },
    }) pagoPlan: Omit<PagoPlan, 'pagoPlanId'>,
  ): Promise<PagoPlan> {
    return this.mascotaRepository.pagoPlans(id).create(pagoPlan);
  }

  @patch('/mascotas/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Mascota.PagoPlan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlan, {partial: true}),
        },
      },
    })
    pagoPlan: Partial<PagoPlan>,
    @param.query.object('where', getWhereSchemaFor(PagoPlan)) where?: Where<PagoPlan>,
  ): Promise<Count> {
    return this.mascotaRepository.pagoPlans(id).patch(pagoPlan, where);
  }

  @del('/mascotas/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Mascota.PagoPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagoPlan)) where?: Where<PagoPlan>,
  ): Promise<Count> {
    return this.mascotaRepository.pagoPlans(id).delete(where);
  }
}
