import {Entity, hasMany, model, property} from '@loopback/repository';
import {ConsultaVet} from './consulta-vet.model';
import {Producto} from './producto.model';

@model()
export class Proveedor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  proveedorId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

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
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => ConsultaVet)
  consultaVets: ConsultaVet[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
