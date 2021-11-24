import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascota,
  Empleado,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaEmpleadoController {
  constructor(
    @repository(MascotaRepository)
    public mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Mascota.prototype.mascotaId,
  ): Promise<Empleado> {
    return this.mascotaRepository.empleado(id);
  }
}
