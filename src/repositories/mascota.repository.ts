import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ConsultaVet, Empleado, Mascota, MascotaRelations, PagoPlan} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ConsultaVetRepository} from './consulta-vet.repository';
import {EmpleadoRepository} from './empleado.repository';
import {PagoPlanRepository} from './pago-plan.repository';


export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.mascotaId,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.mascotaId>;

  public readonly pagoPlans: HasManyRepositoryFactory<PagoPlan, typeof Mascota.prototype.mascotaId>;

  public readonly consultaVets: HasManyRepositoryFactory<ConsultaVet, typeof Mascota.prototype.mascotaId>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.mascotaId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PagoPlanRepository') protected pagoPlanRepositoryGetter: Getter<PagoPlanRepository>, @repository.getter('ConsultaVetRepository') protected consultaVetRepositoryGetter: Getter<ConsultaVetRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Mascota, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.consultaVets = this.createHasManyRepositoryFactoryFor('consultaVets', consultaVetRepositoryGetter,);
    this.registerInclusionResolver('consultaVets', this.consultaVets.inclusionResolver);
    this.pagoPlans = this.createHasManyRepositoryFactoryFor('pagoPlans', pagoPlanRepositoryGetter,);
    this.registerInclusionResolver('pagoPlans', this.pagoPlans.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
