import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, PagoPlan} from '../models';
import {PagoPlanRepository} from './pago-plan.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.planId,
  PlanRelations
> {

  public readonly pagoPlans: HasManyRepositoryFactory<PagoPlan, typeof Plan.prototype.planId>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagoPlanRepository') protected pagoPlanRepositoryGetter: Getter<PagoPlanRepository>,
  ) {
    super(Plan, dataSource);
    this.pagoPlans = this.createHasManyRepositoryFactoryFor('pagoPlans', pagoPlanRepositoryGetter,);
    this.registerInclusionResolver('pagoPlans', this.pagoPlans.inclusionResolver);
  }
}
