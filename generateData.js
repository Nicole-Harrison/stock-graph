let fs = require('fs');
let faker = require('faker');

let letters = 'ABCDEFGFIJKLMNOPQRSTUVWXYZ'

let generateTicker = (i) => {
  let place390625 = Math.trunc(i / 390625);
  let place15625 = Math.trunc((i - 390625 * place390625) / 15625);
  let place625 = Math.trunc((i - 390625 * place390625 - 15625 * place15625) / 625);
  let place25 = Math.trunc((i - 390625 * place390625 - 15625 * place15625 - 625 * place625) / 25);
  let place1 = i - 390625 * place390625 - 15625 * place15625 - 625 * place625 - 25 * place25;
  
  return letters[place390625] + letters[place15625] + letters[place625] + letters[place25] + letters[place1];
}

// ['stockId', 'ticker', 'company', 'relatedTags', 'ownerCount', 'recPercent', 'averageStock', 'changePercent', 'price']
let generateRow = (i) => {
  return `${generateTicker(i)}, ${faker.company.companyName()}, ${faker.lorem.word()}, ` +
  `${faker.random.number({min: 100, max: 10000})}, ${faker.random.number({min: 0, max: 100})}, ` +
  `${faker.random.number({min: 1, max: 5000})}, ${faker.random.number({min: 0, max: 100})}, ` +
  `${faker.random.number({min: 1, max: 5000})} \n`
}

function generateData(writer, chunk) {
  let start = new Date();
  let drainCount = 0;
  let i = 1e7;
  console.log('rows: ' + i)
  
  write();

  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        console.log('drain count: ' + drainCount)
        console.log('finished in ' + (new Date() - start)/1000 + ' seconds');
        chunk = generateRow(i);
        writer.write(chunk);
      } else {
        if ((i % 1e6) === 0) {
          console.log('remaining rows: ' + i + ' time elapse: ' + (new Date() - start)/1000 + ' seconds');

        }
        chunk = generateRow(i);
        ok = writer.write(chunk);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      drainCount++;
      writer.once('drain', write);
    }
  }
}

let writer = fs.createWriteStream('./data.csv')

generateData(writer, generateRow())