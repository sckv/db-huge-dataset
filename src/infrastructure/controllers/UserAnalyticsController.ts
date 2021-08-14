import { inject, injectable } from 'inversify';

import { dateChecker } from './utils';

import { UserAnalyticsRepository } from '../database/UserAnalytics.repository';
import { UserAnalyticsService } from '../../domain/UserAnalyticsService.service';

@injectable()
export class UserAnalyticsController {
  constructor(
    @inject(UserAnalyticsRepository) private userAnalyticsRepository: UserAnalyticsService,
  ) {}
  async userMerchant(userId: string, fromDate: string, toDate: string) {
    dateChecker(fromDate, toDate);
    return {
      result: await this.userAnalyticsRepository.userMerchantBehavior(
        userId,
        new Date(fromDate),
        new Date(toDate),
      ),
    };
  }
}
