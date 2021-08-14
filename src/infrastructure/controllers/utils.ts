import { isBefore, isAfter } from 'date-fns';

const startDate = new Date('2015-1-1');

export const dateChecker = (fromDate: string, toDate: string) => {
  if (!fromDate) throw new Error('No fromDate parameter submitted');
  if (!toDate) throw new Error('No toDate parameter submitted');

  if (!isBefore(new Date(fromDate), new Date()))
    throw new Error('fromDate should be before than today');
  if (isBefore(new Date(fromDate), startDate))
    throw new Error(`fromDate should be after ${startDate.toUTCString()}`);

  if (isBefore(new Date(toDate), new Date(fromDate)))
    throw new Error(`toDate can't be before fromDate`);

  if (isAfter(new Date(toDate), new Date())) throw new Error(`toDate can't be after today`);
};
