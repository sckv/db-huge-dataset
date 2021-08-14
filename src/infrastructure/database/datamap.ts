export const DB_TABLES = {
  MERCHANTS: process.env.DB_TABLE_MERCHANTS || 'merchants',
  USERS: process.env.DB_TABLE_USERS || 'users',
  TRANSACTIONS: process.env.DB_TABLE_TRANSACTIONS || 'transactions',
} as const;
