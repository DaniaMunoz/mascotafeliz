import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PagoPlan,
  Plan,
} from '../models';
import {PagoPlanRepository} from '../repositories';

export class PagoPlanPlanController {
  constructor(
    @repository(PagoPlanRepository)
    public pagoPlanRepository: PagoPlanRepository,
  ) { }

  @get('/pago-plans/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to PagoPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof PagoPlan.prototype.pagoPlanId,
  ): Promise<Plan> {
    return this.pagoPlanRepository.plan(id);
  }
}
