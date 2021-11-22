import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Afiliacion, AfiliacionRelations, Cliente, Empleado, Mascota} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpleadoRepository} from './empleado.repository';
import {MascotaRepository} from './mascota.repository';

export class AfiliacionRepository extends DefaultCrudRepository<
  Afiliacion,
  typeof Afiliacion.prototype.afiliacionId,
  AfiliacionRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Afiliacion.prototype.afiliacionId>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Afiliacion.prototype.afiliacionId>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof Afiliacion.prototype.afiliacionId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Afiliacion, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
