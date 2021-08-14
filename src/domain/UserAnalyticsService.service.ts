export type UserHistory = {
  merchantId: number;
  merchantName: string;
  spent: number;
  percentile: string;
};

export interface UserAnalyticsService {
  userMerchantBehavior(
    userId: string,
    fromDate: Date,
    toDate: Date,
  ): Promise<{
    forUser: string;
    history: UserHistory[];
  }>;
}
