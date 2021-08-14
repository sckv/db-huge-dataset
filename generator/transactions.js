const faker = require('faker');
const addDate = require('date-fns/add');

const fs = require('fs');

const userIdRange = () => faker.datatype.number(1_000_000);

let someDate = new Date('2015-1-1');

const transactionsHeader =
  ['id', 'user_id', 'date', 'amount', 'description', 'merchant_id'].join(';') + '\n';

const transactionsStream = fs.createWriteStream('./sqls/transactions.csv');

transactionsStream.write(transactionsHeader); // write header

console.log('started transactions');
for (let i = 1; i <= 10_000_000; i++) {
  const userRange = userIdRange();
  someDate = addDate(someDate, { seconds: faker.datatype.number({ min: 0, max: 1 }) });
  transactionsStream.write(
    `${i};${userRange};${someDate.toUTCString()};${faker.finance.amount(
      0.5,
      300,
      2,
    )};${faker.commerce.productName()};${faker.datatype.number(500_000)}\n`,
  );
}
transactionsStream.close();
console.log('transactions generated');
