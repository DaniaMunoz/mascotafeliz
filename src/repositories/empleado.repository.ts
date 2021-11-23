import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Afiliacion, Empleado, EmpleadoRelations} from '../models';
import {AfiliacionRepository} from './afiliacion.repository';
//import {EmpleadoRepository} from './empleado.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.empleadoId,
  EmpleadoRelations
> {

  public readonly afiliaciones: HasManyRepositoryFactory<Afiliacion, typeof Empleado.prototype.empleadoId>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empleado.prototype.empleadoId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AfiliacionRepository') protected afiliacionRepositoryGetter: Getter<AfiliacionRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Empleado, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.afiliaciones = this.createHasManyRepositoryFactoryFor('afiliaciones', afiliacionRepositoryGetter,);
    this.registerInclusionResolver('afiliaciones', this.afiliaciones.inclusionResolver);
  }
}
