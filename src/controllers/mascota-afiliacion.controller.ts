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
  Afiliacion,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaAfiliacionController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/afiliacion', {
    responses: {
      '200': {
        description: 'Mascota has one Afiliacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Afiliacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Afiliacion>,
  ): Promise<Afiliacion> {
    return this.mascotaRepository.afiliaciones(id).get(filter);
  }

  @post('/mascotas/{id}/afiliacion', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Afiliacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.mascotaId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {
            title: 'NewAfiliacionInMascota',
            exclude: ['afiliacionId'],
            optional: ['mascotaId']
          }),
        },
      },
    }) afiliacion: Omit<Afiliacion, 'afiliacionId'>,
  ): Promise<Afiliacion> {
    return this.mascotaRepository.afiliaciones(id).create(afiliacion);
  }

  @patch('/mascotas/{id}/afiliacion', {
    responses: {
      '200': {
        description: 'Mascota.Afiliacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {partial: true}),
        },
      },
    })
    afiliacion: Partial<Afiliacion>,
    @param.query.object('where', getWhereSchemaFor(Afiliacion)) where?: Where<Afiliacion>,
  ): Promise<Count> {
    return this.mascotaRepository.afiliaciones(id).patch(afiliacion, where);
  }

  @del('/mascotas/{id}/afiliacion', {
    responses: {
      '200': {
        description: 'Mascota.Afiliacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Afiliacion)) where?: Where<Afiliacion>,
  ): Promise<Count> {
    return this.mascotaRepository.afiliaciones(id).delete(where);
  }
}
