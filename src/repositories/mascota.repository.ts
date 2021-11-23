import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Afiliacion, PagoPlan, ConsultaVet} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AfiliacionRepository} from './afiliacion.repository';
import {PagoPlanRepository} from './pago-plan.repository';
import {ConsultaVetRepository} from './consulta-vet.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.mascotaId,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.mascotaId>;

  public readonly afiliaciones: HasOneRepositoryFactory<Afiliacion, typeof Mascota.prototype.mascotaId>;

  public readonly pagoPlans: HasManyRepositoryFactory<PagoPlan, typeof Mascota.prototype.mascotaId>;

  public readonly consultaVets: HasManyRepositoryFactory<ConsultaVet, typeof Mascota.prototype.mascotaId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AfiliacionRepository') protected afiliacionRepositoryGetter: Getter<AfiliacionRepository>, @repository.getter('PagoPlanRepository') protected pagoPlanRepositoryGetter: Getter<PagoPlanRepository>, @repository.getter('ConsultaVetRepository') protected consultaVetRepositoryGetter: Getter<ConsultaVetRepository>,
  ) {
    super(Mascota, dataSource);
    this.consultaVets = this.createHasManyRepositoryFactoryFor('consultaVets', consultaVetRepositoryGetter,);
    this.registerInclusionResolver('consultaVets', this.consultaVets.inclusionResolver);
    this.pagoPlans = this.createHasManyRepositoryFactoryFor('pagoPlans', pagoPlanRepositoryGetter,);
    this.registerInclusionResolver('pagoPlans', this.pagoPlans.inclusionResolver);
    this.afiliaciones = this.createHasOneRepositoryFactoryFor('afiliaciones', afiliacionRepositoryGetter);
    this.registerInclusionResolver('afiliaciones', this.afiliaciones.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
