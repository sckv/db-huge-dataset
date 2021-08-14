import { inject, injectable } from 'inversify';
import Knex from 'knex';

import { DatabaseConnection } from './connection';
import { DB_TABLES } from './datamap';

import type { UserAnalyticsService } from '../../domain/UserAnalyticsService.service';

@injectable()
export class UserAnalyticsRepository implements UserAnalyticsService {
  constructor(@inject(DatabaseConnection) private db: DatabaseConnection) {}

  public async userMerchantBehavior(userId: string, fromDate: Date, toDate: Date) {
    const userBaseQuery = this.db.make
      .select('user_id', 'merchant_id', this.db.make.raw(`sum(amount) as "userSpent"`))
      .from(DB_TABLES.TRANSACTIONS)
      .whereRaw(`date >= to_date(:fromDate, 'YYYY-MM-DD')`, { fromDate: new Date(fromDate) })
      .andWhereRaw(`date <= to_date(:toDate, 'YYYY-MM-DD')`, { toDate: new Date(toDate) })
      .andWhere('user_id', userId)
      .groupBy('user_id', 'merchant_id');

    const merchantBaseQuery = this.db.make.select('id', 'display_name').from(DB_TABLES.MERCHANTS);

    const usersGenericQuery = this.db.make
      .select(
        't2.user_id     as userId',
        't1.user_id',
        't2.merchant_id as merchantId',
        'm.display_name as merchantName',
        'userSpent',
        this.db.make.raw(`sum(amount) as "usersSpentOnMerchant"`),
      )
      .from(this.db.make.raw(`${DB_TABLES.TRANSACTIONS} t1`))
      .innerJoin(userBaseQuery.as('t2'), 't1.merchant_id', 't2.merchant_id')
      .innerJoin(merchantBaseQuery.as('m'), 't2.merchant_id', 'm.id')
      .whereRaw(`date >= to_date(:fromDate, 'YYYY-MM-DD')`, { fromDate })
      .andWhereRaw(`date <= to_date(:toDate, 'YYYY-MM-DD')`, { toDate })
      .groupBy('userId', 't1.user_id', 't2.userSpent', 't2.merchant_id', 'm.display_name');

    const analyticsQuery = this.makeAnalyticsQuery(usersGenericQuery).timeout(2000, {
      cancel: true,
    });

    const executedQuery = await analyticsQuery.catch((e) => {
      console.log(e);
      throw new Error('Something happened');
    });

    return { forUser: userId, history: executedQuery };
  }

  makeAnalyticsQuery<T extends Knex.QueryBuilder>(usersQuery: T) {
    const groupedUsersSpentArray = this.db.make
      .select(
        'userId',
        'merchantId',
        'merchantName',
        'userSpent',
        this.db.make.raw(
          `array_agg("usersSpentOnMerchant" order by "usersSpentOnMerchant") as "spentArray"`,
        ),
      )
      .from(usersQuery.as('uq'))
      .groupBy('userId', 'merchantId', 'userSpent', 'merchantName');

    const percentiledAnalysis = this.db.make
      .select(
        'merchantId',
        'merchantName',
        'userSpent as spent',
        this.db.make.raw(
          `round(array_position("spentArray", "userSpent")::decimal / array_length("spentArray", 1) * 100, 2) as "percentile"`,
        ),
      )
      .from(groupedUsersSpentArray.as('gusa'))
      .groupBy('merchantId', 'userId', 'userSpent', 'merchantName', 'spentArray');

    return percentiledAnalysis;
  }
}
