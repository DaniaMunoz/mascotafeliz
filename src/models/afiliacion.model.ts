import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {Mascota} from './mascota.model';

@model()
export class Afiliacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  afiliacionId?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoAfiliacion: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<Afiliacion>) {
    super(data);
  }
}

export interface AfiliacionRelations {
  // describe navigational properties here
}

export type AfiliacionWithRelations = Afiliacion & AfiliacionRelations;
