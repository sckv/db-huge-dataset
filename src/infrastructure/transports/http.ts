import { BareHttp } from 'barehttp';

import { container } from '../../ioc';
import { UserAnalyticsController } from '../controllers/UserAnalyticsController';

export const httpApp = new BareHttp({ requestTimeFormat: 'ms' });
const uaController = container.get(UserAnalyticsController);

httpApp.get({
  route: '/user/:userId/analytics/merchants',
  handler: (flow) => {
    const { userId } = flow.params;
    const { fromDate, toDate } = flow.query;
    return uaController.userMerchant(userId!, fromDate!, toDate!);
  },
});
