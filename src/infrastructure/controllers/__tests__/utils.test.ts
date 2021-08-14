import { dateChecker } from '../utils';

describe('Utils', () => {
  test('Check fromDate is not empty', () => {
    expect(() => dateChecker(null as any, 'date')).toThrow(Error);
  });

  test('Check toDate is not empty', () => {
    expect(() => dateChecker('date', null as any)).toThrow(Error);
  });

  test('Check toDate is not before fromDate', () => {
    expect(() => dateChecker('2015-1-10', '2015-1-9')).toThrow(Error);
  });

  test('Check fromDate is too early', () => {
    expect(() => dateChecker('2014-12-25', '2015-1-9')).toThrow(Error);
  });

  test('Check for dates is ok', () => {
    expect(() => dateChecker('2015-1-2', '2015-1-12')).not.toThrow();
  });
});
