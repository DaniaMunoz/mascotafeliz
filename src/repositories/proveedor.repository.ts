import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Producto, ConsultaVet} from '../models';
import {ProductoRepository} from './producto.repository';
import {ConsultaVetRepository} from './consulta-vet.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.proveedorId,
  ProveedorRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Proveedor.prototype.proveedorId>;

  public readonly consultaVets: HasManyRepositoryFactory<ConsultaVet, typeof Proveedor.prototype.proveedorId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ConsultaVetRepository') protected consultaVetRepositoryGetter: Getter<ConsultaVetRepository>,
  ) {
    super(Proveedor, dataSource);
    this.consultaVets = this.createHasManyRepositoryFactoryFor('consultaVets', consultaVetRepositoryGetter,);
    this.registerInclusionResolver('consultaVets', this.consultaVets.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
