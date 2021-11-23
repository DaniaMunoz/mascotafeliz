import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Afiliacion} from './afiliacion.model';
import {PagoPlan} from './pago-plan.model';
import {ConsultaVet} from './consulta-vet.model';

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
    type: 'date',
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

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasOne(() => Afiliacion)
  afiliaciones: Afiliacion;

  @hasMany(() => PagoPlan)
  pagoPlans: PagoPlan[];

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
