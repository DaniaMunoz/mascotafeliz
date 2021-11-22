import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {Mascota} from './mascota.model';

@model()
export class PagoPlan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  pagoPlanId?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPlan: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<PagoPlan>) {
    super(data);
  }
}

export interface PagoPlanRelations {
  // describe navigational properties here
}

export type PagoPlanWithRelations = PagoPlan & PagoPlanRelations;
