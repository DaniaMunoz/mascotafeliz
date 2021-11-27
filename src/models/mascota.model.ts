import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {ConsultaVet} from './consulta-vet.model';
import {Empleado} from './empleado.model';
import {PagoPlan} from './pago-plan.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  mascotaId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    //type: 'date',
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  enfermedades: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  //Nuevos atributos
  @property({
    //type: 'date',
    type: 'string',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: false,
  })
  estadoSolicitud: string;

  @property({
    type: 'string',
    required: false,
  })
  observaciones: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => PagoPlan)
  pagoPlans: PagoPlan[];

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => ConsultaVet)
  consultaVets: ConsultaVet[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
