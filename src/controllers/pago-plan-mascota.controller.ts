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
  Mascota,
} from '../models';
import {PagoPlanRepository} from '../repositories';

export class PagoPlanMascotaController {
  constructor(
    @repository(PagoPlanRepository)
    public pagoPlanRepository: PagoPlanRepository,
  ) { }

  @get('/pago-plans/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to PagoPlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof PagoPlan.prototype.pagoPlanId,
  ): Promise<Mascota> {
    return this.pagoPlanRepository.mascota(id);
  }
}
