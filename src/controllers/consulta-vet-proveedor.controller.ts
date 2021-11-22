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
  Proveedor,
} from '../models';
import {ConsultaVetRepository} from '../repositories';

export class ConsultaVetProveedorController {
  constructor(
    @repository(ConsultaVetRepository)
    public consultaVetRepository: ConsultaVetRepository,
  ) { }

  @get('/consulta-vets/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to ConsultaVet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof ConsultaVet.prototype.consultaVetId,
  ): Promise<Proveedor> {
    return this.consultaVetRepository.proveedor(id);
  }
}
