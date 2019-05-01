const fs = require('fs');
const { Readable } = require('stream');
const faker = require('faker');

const letters = 'ABCDEFGFIJKLMNOPQRSTUVWXYZ'
let generateTicker = (i) => {
  let remainder = i;
  let place390625 = Math.trunc(remainder / 390625); 
  remainder -= 390625 * place390625
  let place15625 = Math.trunc(remainder / 15625);
  remainder -= 15625 * place15625
  let place625 = Math.trunc(remainder / 625);
  remainder -= 625 * place625;
  let place25 = Math.trunc(remainder/ 25);
  remainder -= 25 * place25
  let place1 = remainder;

  return letters[place390625] + letters[place15625] + letters[place625] + letters[place25] + letters[place1];
}

let generatePriceArray = () => {
  let prices = [];
  for (let i = 0; i < 107; i++) {
    prices.push(faker.random.number({min: 1, max: 5000}));
  }
  return prices;
}

let generatePrices = () => {
  let json = {
    day: generatePriceArray(),
    week: generatePriceArray(),
    month: generatePriceArray(),
    threeMonth: generatePriceArray(),
    year: generatePriceArray(),
    fiveYear: generatePriceArray()
  };

  return JSON.stringify(json);
}

let generateRow = (i) => {
  return `${generateTicker(i)}|${faker.company.companyName()}|{${faker.lorem.word()}, ${faker.lorem.word()}}|` +
  `${faker.random.number({min: 100, max: 10000})}|${faker.random.number({min: 0, max: 100})}|` +
  `${faker.random.number({min: 1, max: 5000})}|${faker.random.number({min: 0, max: 100})}|` +
  `${generatePrices()}\n`
}

const inStream = new Readable({
  read() {
    this.push(generateRow(this.count--));
    if (this.count === 0) {
      this.push(null);
    }
  }
 });

inStream.count = 1e7;
inStream.push(`stock_id|ticker|company|related_tags|owner_count|rec_percent|average_stock|change_percent|prices\n`)
inStream.pipe(fs.createWriteStream('./postgresStocks.txt'));
