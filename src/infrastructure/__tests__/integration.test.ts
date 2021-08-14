import axios from 'axios';

import { container } from '../../ioc';
import { DatabaseConnection } from '../database/connection';
import { httpApp } from '../transports/http';

import fs from 'fs';

const db = container.get<DatabaseConnection>(DatabaseConnection);

beforeAll((done) => {
  const sql = fs.readFileSync(`${__dirname}/fixtures/test.sql`).toString();
  db.make.raw(sql).then(() => httpApp.start(() => done()));
});

afterAll((done) => {
  db.make
    .raw(
      `
    DROP TABLE IF EXISTS "test_transactions";
    DROP TABLE IF EXISTS "test_merchants";
    `,
    )
    .then(() =>
      db.make.destroy(() => {
        httpApp.stop(() => done());
      }),
    );
});

describe('UserAnalytics - integration', () => {
  test('User analytics for a merchant behavior, user 1', async () => {
    const response = await axios.get(
      'http://localhost:3000/user/1/analytics/merchants?fromDate=2018-01-01&toDate=2018-01-07',
    );

    expect(response.headers['content-type']).toBe('application/json');
    expect(response.status).toBe(200);

    expect(response.data).toEqual({
      result: {
        forUser: '1',
        history: [
          {
            merchantId: 1,
            merchantName: 'test_merchant',
            percentile: '50.00',
            spent: '22.00',
          },
          {
            merchantId: 2,
            merchantName: 'test_merchant2',
            percentile: '100.00',
            spent: '40.00',
          },
          {
            merchantId: 3,
            merchantName: 'test_merchant3',
            percentile: '50.00',
            spent: '180.00',
          },
        ],
      },
    });
  });

  test('User analytics for a merchant behavior, user 2', async () => {
    const response = await axios.get(
      'http://localhost:3000/user/2/analytics/merchants?fromDate=2018-01-01&toDate=2018-01-07',
    );

    expect(response.headers['content-type']).toBe('application/json');
    expect(response.status).toBe(200);

    expect(response.data).toEqual({
      result: {
        forUser: '2',
        history: [
          {
            merchantId: 1,
            merchantName: 'test_merchant',
            percentile: '25.00',
            spent: '5.00',
          },
          {
            merchantId: 2,
            merchantName: 'test_merchant2',
            percentile: '50.00',
            spent: '37.00',
          },
        ],
      },
    });
  });

  test('User analytics for a merchant behavior, user 3', async () => {
    const response = await axios.get(
      'http://localhost:3000/user/3/analytics/merchants?fromDate=2018-01-01&toDate=2018-01-07',
    );

    expect(response.headers['content-type']).toBe('application/json');
    expect(response.status).toBe(200);

    expect(response.data).toEqual({
      result: {
        forUser: '3',
        history: [
          {
            merchantId: 1,
            merchantName: 'test_merchant',
            percentile: '75.00',
            spent: '60.00',
          },
        ],
      },
    });
  });

  test('User analytics for a merchant behavior, user 4', async () => {
    const response = await axios.get(
      'http://localhost:3000/user/4/analytics/merchants?fromDate=2018-01-01&toDate=2018-01-07',
    );

    expect(response.headers['content-type']).toBe('application/json');
    expect(response.status).toBe(200);

    expect(response.data).toEqual({
      result: {
        forUser: '4',
        history: [
          {
            merchantId: 1,
            merchantName: 'test_merchant',
            percentile: '100.00',
            spent: '102.30',
          },
          {
            merchantId: 3,
            merchantName: 'test_merchant3',
            percentile: '100.00',
            spent: '200.00',
          },
        ],
      },
    });
  });
});
