const faker = require('faker');

const fs = require('fs');

const merchantsHeader = ['id', 'display_name', 'icon_url'].join(';') + '\n';

const merchantsStream = fs.createWriteStream(`./sqls/merchants.csv`);
merchantsStream.write(merchantsHeader); // write header

console.log('started merchants');
for (let i = 1; i <= 500_000; i++) {
  merchantsStream.write([i, faker.company.companyName(), faker.image.imageUrl()].join(';') + '\n');
}
merchantsStream.close();
console.log('merchants generated');
