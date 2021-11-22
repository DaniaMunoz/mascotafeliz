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
  Empleado,
} from '../models';
import {AfiliacionRepository} from '../repositories';

export class AfiliacionEmpleadoController {
  constructor(
    @repository(AfiliacionRepository)
    public afiliacionRepository: AfiliacionRepository,
  ) { }

  @get('/afiliacions/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Afiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Afiliacion.prototype.afiliacionId,
  ): Promise<Empleado> {
    return this.afiliacionRepository.empleado(id);
  }
}
