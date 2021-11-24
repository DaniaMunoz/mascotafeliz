import {Entity, hasMany, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';

//import {Empleado} from './empleado.model';

@model()
export class Empleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  empleadoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  nivel: string;

  @property({
    type: 'string',
  })
  usuario?: string;

  @property({
    type: 'string',
  })
  clave?: string;



  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
