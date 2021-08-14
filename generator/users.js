const faker = require('faker');

const fs = require('fs');

const usersStream = fs.createWriteStream('./sqls/users.csv');

const usersHeader = ['id', 'first_name', 'last_name'].join(';') + '\n';
usersStream.write(usersHeader); // write header

console.log('started users');
for (let i = 1; i <= 1_000_000; i++) {
  usersStream.write([i, faker.name.firstName(), faker.name.lastName()].join(';') + '\n');
}
usersStream.close();
console.log('users generated');
