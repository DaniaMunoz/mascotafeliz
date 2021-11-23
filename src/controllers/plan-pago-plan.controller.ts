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
  Plan,
  PagoPlan,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPagoPlanController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Array of Plan has many PagoPlan',
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
    return this.planRepository.pagoPlans(id).find(filter);
  }

  @post('/plans/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagoPlan)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.planId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoPlan, {
            title: 'NewPagoPlanInPlan',
            exclude: ['pagoPlanId'],
            optional: ['planId']
          }),
        },
      },
    }) pagoPlan: Omit<PagoPlan, 'pagoPlanId'>,
  ): Promise<PagoPlan> {
    return this.planRepository.pagoPlans(id).create(pagoPlan);
  }

  @patch('/plans/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Plan.PagoPlan PATCH success count',
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
    return this.planRepository.pagoPlans(id).patch(pagoPlan, where);
  }

  @del('/plans/{id}/pago-plans', {
    responses: {
      '200': {
        description: 'Plan.PagoPlan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagoPlan)) where?: Where<PagoPlan>,
  ): Promise<Count> {
    return this.planRepository.pagoPlans(id).delete(where);
  }
}
