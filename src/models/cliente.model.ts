import {Entity, model, property, hasMany} from '@loopback/repository';
import {Afiliacion} from './afiliacion.model';
import {Pedido} from './pedido.model';
import {Mascota} from './mascota.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  clienteId?: string;

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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  telefonoFijo?: string;

  @property({
    type: 'string',
    required: true,
  })
  telefonoCelular: string;

  @property({
    type: 'string',
  })
  usuario?: string;

  @property({
    type: 'string',
  })
  clave?: string;

  @hasMany(() => Afiliacion)
  afiliaciones: Afiliacion[];

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  @hasMany(() => Mascota)
  mascotas: Mascota[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
