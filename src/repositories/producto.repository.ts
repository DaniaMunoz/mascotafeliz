import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Proveedor, PedidoProducto} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {PedidoProductoRepository} from './pedido-producto.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.productoId,
  ProductoRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.productoId>;

  public readonly pedidoProductos: HasManyRepositoryFactory<PedidoProducto, typeof Producto.prototype.productoId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>,
  ) {
    super(Producto, dataSource);
    this.pedidoProductos = this.createHasManyRepositoryFactoryFor('pedidoProductos', pedidoProductoRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
