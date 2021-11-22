import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Proveedor} from './proveedor.model';

@model()
export class ConsultaVet extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  consultaVetId?: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<ConsultaVet>) {
    super(data);
  }
}

export interface ConsultaVetRelations {
  // describe navigational properties here
}

export type ConsultaVetWithRelations = ConsultaVet & ConsultaVetRelations;
