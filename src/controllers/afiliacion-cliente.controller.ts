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
  Cliente,
} from '../models';
import {AfiliacionRepository} from '../repositories';

export class AfiliacionClienteController {
  constructor(
    @repository(AfiliacionRepository)
    public afiliacionRepository: AfiliacionRepository,
  ) { }

  @get('/afiliacions/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Afiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.string('id') id: typeof Afiliacion.prototype.afiliacionId,
  ): Promise<Cliente> {
    return this.afiliacionRepository.cliente(id);
  }
}
