import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  //Empleado,
  Empleado
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoEmpleadoController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.empleados(id).find(filter);
  }

  @post('/empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.empleadoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInEmpleado',
            exclude: ['empleadoId'],
            optional: ['empleadoId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'empleadoId'>,
  ): Promise<Empleado> {
    return this.empleadoRepository.empleados(id).create(empleado);
  }

  @patch('/empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empleado.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.empleados(id).patch(empleado, where);
  }

  @del('/empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'Empleado.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.empleados(id).delete(where);
  }
}
