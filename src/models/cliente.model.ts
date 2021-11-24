import {Entity, hasMany, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Pedido} from './pedido.model';


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
