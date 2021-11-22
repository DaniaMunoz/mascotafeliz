import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Afiliacion,
  Mascota,
} from '../models';
import {AfiliacionRepository} from '../repositories';

export class AfiliacionMascotaController {
  constructor(
    @repository(AfiliacionRepository)
    public afiliacionRepository: AfiliacionRepository,
  ) { }

  @get('/afiliacions/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Afiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Afiliacion.prototype.afiliacionId,
  ): Promise<Mascota> {
    return this.afiliacionRepository.mascota(id);
  }
}
