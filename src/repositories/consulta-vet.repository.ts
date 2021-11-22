import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ConsultaVet, ConsultaVetRelations, Mascota, Proveedor} from '../models';
import {MascotaRepository} from './mascota.repository';
import {ProveedorRepository} from './proveedor.repository';

export class ConsultaVetRepository extends DefaultCrudRepository<
  ConsultaVet,
  typeof ConsultaVet.prototype.consultaVetId,
  ConsultaVetRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof ConsultaVet.prototype.consultaVetId>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof ConsultaVet.prototype.consultaVetId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(ConsultaVet, dataSource);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
