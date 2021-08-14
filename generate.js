const { spawn } = require('child_process');

(async function generate() {
  spawn('node', [`${__dirname}/generator/merchants.js`]).stdout.on('data', (d) =>
    console.log(d.toString()),
  );
  spawn('node', [`${__dirname}/generator/users.js`]).stdout.on('data', (d) =>
    console.log(d.toString()),
  );
  spawn('node', [`${__dirname}/generator/transactions.js`]).stdout.on('data', (d) =>
    console.log(d.toString()),
  );
})();
