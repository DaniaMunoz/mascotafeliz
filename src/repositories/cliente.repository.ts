import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Afiliacion, Pedido, Mascota} from '../models';
import {AfiliacionRepository} from './afiliacion.repository';
import {PedidoRepository} from './pedido.repository';
import {MascotaRepository} from './mascota.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.clienteId,
  ClienteRelations
> {

  public readonly afiliaciones: HasManyRepositoryFactory<Afiliacion, typeof Cliente.prototype.clienteId>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.clienteId>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.clienteId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AfiliacionRepository') protected afiliacionRepositoryGetter: Getter<AfiliacionRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Cliente, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.afiliaciones = this.createHasManyRepositoryFactoryFor('afiliaciones', afiliacionRepositoryGetter,);
    this.registerInclusionResolver('afiliaciones', this.afiliaciones.inclusionResolver);
  }
}
