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
  Mascota,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoMascotaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Mascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascota>,
  ): Promise<Mascota[]> {
    return this.empleadoRepository.mascotas(id).find(filter);
  }

  @post('/empleados/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.empleadoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {
            title: 'NewMascotaInEmpleado',
            exclude: ['mascotaId'],
            optional: ['empleadoId']
          }),
        },
      },
    }) mascota: Omit<Mascota, 'mascotaId'>,
  ): Promise<Mascota> {
    return this.empleadoRepository.mascotas(id).create(mascota);
  }

  @patch('/empleados/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Empleado.Mascota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascota, {partial: true}),
        },
      },
    })
    mascota: Partial<Mascota>,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.empleadoRepository.mascotas(id).patch(mascota, where);
  }

  @del('/empleados/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Empleado.Mascota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascota)) where?: Where<Mascota>,
  ): Promise<Count> {
    return this.empleadoRepository.mascotas(id).delete(where);
  }
}
