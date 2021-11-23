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
  Proveedor,
  ConsultaVet,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorConsultaVetController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many ConsultaVet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ConsultaVet)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ConsultaVet>,
  ): Promise<ConsultaVet[]> {
    return this.proveedorRepository.consultaVets(id).find(filter);
  }

  @post('/proveedors/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultaVet)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.proveedorId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVet, {
            title: 'NewConsultaVetInProveedor',
            exclude: ['consultaVetId'],
            optional: ['proveedorId']
          }),
        },
      },
    }) consultaVet: Omit<ConsultaVet, 'consultaVetId'>,
  ): Promise<ConsultaVet> {
    return this.proveedorRepository.consultaVets(id).create(consultaVet);
  }

  @patch('/proveedors/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Proveedor.ConsultaVet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVet, {partial: true}),
        },
      },
    })
    consultaVet: Partial<ConsultaVet>,
    @param.query.object('where', getWhereSchemaFor(ConsultaVet)) where?: Where<ConsultaVet>,
  ): Promise<Count> {
    return this.proveedorRepository.consultaVets(id).patch(consultaVet, where);
  }

  @del('/proveedors/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Proveedor.ConsultaVet DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsultaVet)) where?: Where<ConsultaVet>,
  ): Promise<Count> {
    return this.proveedorRepository.consultaVets(id).delete(where);
  }
}
