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
  Empleado,
  Afiliacion,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoAfiliacionController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Afiliacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Afiliacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Afiliacion>,
  ): Promise<Afiliacion[]> {
    return this.empleadoRepository.afiliaciones(id).find(filter);
  }

  @post('/empleados/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Afiliacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.empleadoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Afiliacion, {
            title: 'NewAfiliacionInEmpleado',
            exclude: ['afiliacionId'],
            optional: ['empleadoId']
          }),
        },
      },
    }) afiliacion: Omit<Afiliacion, 'afiliacionId'>,
  ): Promise<Afiliacion> {
    return this.empleadoRepository.afiliaciones(id).create(afiliacion);
  }

  @patch('/empleados/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Empleado.Afiliacion PATCH success count',
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
    return this.empleadoRepository.afiliaciones(id).patch(afiliacion, where);
  }

  @del('/empleados/{id}/afiliacions', {
    responses: {
      '200': {
        description: 'Empleado.Afiliacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Afiliacion)) where?: Where<Afiliacion>,
  ): Promise<Count> {
    return this.empleadoRepository.afiliaciones(id).delete(where);
  }
}
