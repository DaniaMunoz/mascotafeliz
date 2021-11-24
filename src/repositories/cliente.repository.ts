import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Mascota, Pedido} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PedidoRepository} from './pedido.repository';


export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.clienteId,
  ClienteRelations
> {



  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.clienteId>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.clienteId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Cliente, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);

  }
}
