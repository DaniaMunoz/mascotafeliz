import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ConsultaVet,
  Mascota,
} from '../models';
import {ConsultaVetRepository} from '../repositories';

export class ConsultaVetMascotaController {
  constructor(
    @repository(ConsultaVetRepository)
    public consultaVetRepository: ConsultaVetRepository,
  ) { }

  @get('/consulta-vets/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to ConsultaVet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof ConsultaVet.prototype.consultaVetId,
  ): Promise<Mascota> {
    return this.consultaVetRepository.mascota(id);
  }
}
