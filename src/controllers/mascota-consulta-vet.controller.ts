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
  Mascota,
  ConsultaVet,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaConsultaVetController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Array of Mascota has many ConsultaVet',
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
    return this.mascotaRepository.consultaVets(id).find(filter);
  }

  @post('/mascotas/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultaVet)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.mascotaId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaVet, {
            title: 'NewConsultaVetInMascota',
            exclude: ['consultaVetId'],
            optional: ['mascotaId']
          }),
        },
      },
    }) consultaVet: Omit<ConsultaVet, 'consultaVetId'>,
  ): Promise<ConsultaVet> {
    return this.mascotaRepository.consultaVets(id).create(consultaVet);
  }

  @patch('/mascotas/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Mascota.ConsultaVet PATCH success count',
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
    return this.mascotaRepository.consultaVets(id).patch(consultaVet, where);
  }

  @del('/mascotas/{id}/consulta-vets', {
    responses: {
      '200': {
        description: 'Mascota.ConsultaVet DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsultaVet)) where?: Where<ConsultaVet>,
  ): Promise<Count> {
    return this.mascotaRepository.consultaVets(id).delete(where);
  }
}
